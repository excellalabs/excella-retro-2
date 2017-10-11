import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatSelect } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Retro } from '../../models/retro';
import { Phase } from '../../models/phase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
declare var require: any;
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
    private dialogRef: MatDialogRef<CreateRetroFormComponent>) { }

  ngOnInit() {
    this.addPhase(0, 'What Went Well?');
    this.addPhase(1, 'What Went Wrong?');
    this.addPhase(2, 'Action Items');

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

  addPhase(index: number, name?: string) {
    this.phases.forEach(function (phase, i) {
      if (i >= index) {
        phase.order += 1;
      };
    });

    this.phases.splice(index, 0, (new Phase(name, 1, 1, '', index + 1)));
  }

  removePhase(index) {
    this.phases.forEach(function(phase, i) {
        if (i > index) {
          phase.order -= 1;
        };
    })
    this.phases.splice(index, 1);
  }

  createRetro(retroName: string) {
    const that = this;
    const retro = new Retro(retroName, true, null, 1, this.numberOfVotes, this.user.auth.uid);
    const retrosList = this.af.database.list('retros');
    const allPhasesList = this.af.database.list('phases');

    var randomId = this.generateRandomId();
    
    this.af.database.object('retros/' + randomId).set(retro).then(() => {
      let retroObservable = this.af.database.object('retros/' + randomId);
      let retroSubscription = retroObservable.subscribe(pushedRetro => {
        for (let x = 0; x < that.phases.length; x++) {
          that.phases[x].retroId = pushedRetro.$key;
          allPhasesList.push(that.phases[x]);
        }
  
        const phasesObservable = this.af.database.list('phases', {
          query: {
            orderByChild: 'retroId',
            equalTo: pushedRetro.$key
          }
        });
  
        this.phasesSubscription = phasesObservable.subscribe(orderedPhases => {
          const firstPhaseId = orderedPhases[0].$key;
          retroObservable.update({ currentPhaseId: firstPhaseId });
  
          const currentUserId = localStorage.getItem('currentUserId');
          if (currentUserId == null) {
            const newUser = this.af.database.list('users').push({
              retroId: pushedRetro.$key
            });
  
            localStorage.setItem('currentUserId', newUser.key);
          }
  
          that.router.navigate(['/retro/' + pushedRetro.$key]);
          that.dialogRef.close();
        });
      });
      retroSubscription.unsubscribe();
      
    });
  }

  retroWithIdExists(id: string) {
    this.af.database.object('retros/' + id).subscribe(retroVal => {
      return !(retroVal.hasOwnProperty('$value') && !retroVal['$value']);
    });
  }

  generateRandomId() {
    var generate = require('nanoid/generate');
    var randomId = generate('1234567890ABCDEF', 6);
    while(this.retroWithIdExists(randomId)) {
      randomId = generate('1234567890ABCDEF', 6)
    }
    return randomId;
  }
}
