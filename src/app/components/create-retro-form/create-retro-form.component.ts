import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef, MdSelect } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Retro } from '../../models/retro';
import { Phase } from '../../models/phase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-create-retro-form',
  templateUrl: './create-retro-form.component.html',
})

export class CreateRetroFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  phasesSubscription: Subscription;
  retroName: string;
  numberOfVotes = 2;
  phases = [];
  user;

  constructor(private af: AngularFire,
    private router: Router,
    private dialogRef: MdDialogRef<CreateRetroFormComponent>) { }

  ngOnInit() {
    while (this.phases.length < 3) {
      this.addPhase();
    }

    this.userSubscription = this.af.auth.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.phasesSubscription) {
      this.phasesSubscription.unsubscribe();
    };
  }

  addPhase() {
    this.phases.push(new Phase('', 1, 1, '', this.phases.length + 1));
  }

  removePhase() {
    this.phases.splice(-1);
  }

  createRetro(retroName: string) {
    const that = this;
    const retro = new Retro(retroName, true, null, 1, this.numberOfVotes, this.user.auth.uid);
    const retrosList = this.af.database.list('retros');
    const allPhasesList = this.af.database.list('phases');

    retrosList.push(retro).then((pushedRetro) => {
      for (let x = 0; x < that.phases.length; x++) {
        that.phases[x].retroId = pushedRetro.key;
        allPhasesList.push(that.phases[x]);
      }

      const phasesObservable = this.af.database.list('phases', {
        query: {
          orderByChild: 'retroId',
          equalTo: pushedRetro.key
        }
      });

      this.phasesSubscription = phasesObservable.subscribe(orderedPhases => {
          const firstPhaseId = orderedPhases[0].$key;
          pushedRetro.update({ currentPhaseId: firstPhaseId });
        });

      const currentUserId = localStorage.getItem('currentUserId');
      if (currentUserId == null) {
        const newUser = this.af.database.list('users').push({
          retroId: pushedRetro.key
        });
        localStorage.setItem('currentUserId', newUser.key);
      }

      that.router.navigate(['/retro/' + pushedRetro.key]);
      that.dialogRef.close();
    });
  }
}
