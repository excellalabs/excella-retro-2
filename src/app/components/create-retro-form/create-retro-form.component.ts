import { Component, OnDestroy, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database'
import { MatDialogRef, MatSelect } from '@angular/material'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { Phase } from '../../models/phase'
import { Retro } from '../../models/retro'

declare var require: any
@Component({
  selector: 'app-create-retro-form',
  templateUrl: './create-retro-form.component.html',
})
export class CreateRetroFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription
  phasesSubscription: Subscription
  retroSubscription: Subscription
  retroName: string
  numberOfVotes = 2
  phases = []
  user

  constructor(
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private dialogRef: MatDialogRef<CreateRetroFormComponent>
  ) {}

  ngOnInit() {
    this.addPhase(0, 'What Went Well?')
    this.addPhase(1, 'What Went Wrong?')
    this.addPhase(2, 'Action Items')

    this.userSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
    if (this.phasesSubscription) {
      this.phasesSubscription.unsubscribe()
    }
    if (this.retroSubscription) {
      this.retroSubscription.unsubscribe()
    }
  }

  addPhase(index: number, name?: string) {
    this.phases.forEach(function(phase, i) {
      if (i >= index) {
        phase.order += 1
      }
    })

    this.phases.splice(index, 0, new Phase(name, 1, 1, '', index + 1))
  }

  removePhase(index) {
    this.phases.forEach(function(phase, i) {
      if (i > index) {
        phase.order -= 1
      }
    })
    this.phases.splice(index, 1)
  }

  createRetro(retroName: string) {
    const that = this
    const retro = new Retro(
      retroName,
      true,
      null,
      1,
      this.numberOfVotes,
      this.user.auth.uid
    )
    const retrosList = this.afDatabase.database.list('retros')
    const allPhasesList = this.afDatabase.database.list('phases')

    const randomId = this.generateRandomId()

    this.afDatabase.database
      .object('retros/' + randomId)
      .set(retro)
      .then(() => {
        const retroObservable = this.afDatabase
          .object('retros/' + randomId)
          .valueChanges()
        this.retroSubscription = retroObservable.subscribe(pushedRetro => {
          for (let x = 0; x < that.phases.length; x++) {
            that.phases[x].retroId = pushedRetro.$key
            allPhasesList.push(that.phases[x])
          }

          const phasesObservable = this.afDatabase.database.list('phases', {
            query: {
              orderByChild: 'retroId',
              equalTo: pushedRetro.$key,
            },
          })

          this.phasesSubscription = phasesObservable.subscribe(orderedPhases => {
            const firstPhaseId = orderedPhases[0].$key
            retroObservable.update({ currentPhaseId: firstPhaseId })

            const currentUserId = localStorage.getItem('currentUserId')
            if (currentUserId == null) {
              const newUser = this.afDatabase.database.list('users').push({
                retroId: pushedRetro.$key,
              })

              localStorage.setItem('currentUserId', newUser.key)
            }

            that.router.navigate(['/retro/' + pushedRetro.$key])
            that.dialogRef.close()
          })
        })
      })
  }

  retroWithIdExists(id: string) {
    this.afDatabase.database.object('retros/' + id).subscribe(retroVal => {
      return !(retroVal.hasOwnProperty('$value') && !retroVal['$value'])
    })
  }

  generateRandomId() {
    const generate = require('nanoid/generate')
    const randomId = generate('1234567890ABCDEF', 6)
    while (this.retroWithIdExists(randomId)) {
      randomId = generate('1234567890ABCDEF', 6)
    }
    return randomId
  }
}
