import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef, MdSelect } from '@angular/material';
import { Retro } from '../../models/retro';
import { Phase } from '../../models/phase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-create-retro-form',
  templateUrl: './create-retro-form.component.html',
})

export class CreateRetroFormComponent {
  retroName: string;
  numberOfVotes = 2;
  phases = [];
  af;

  constructor(af: AngularFire, private router: Router, private dialogRef: MdDialogRef<CreateRetroFormComponent>) {
    this.af = af;
    while (this.phases.length < 3) {
      this.addPhase();
    }
  }

  addPhase() {
    this.phases.push(new Phase('', 1, 1, '', this.phases.length + 1));
  }

  removePhase() {
    this.phases.splice(-1);
  }

  createRetro(retroName: string) {
    let that = this;
    let retro = new Retro(retroName, true, null, 1, this.numberOfVotes);
    let retrosList = this.af.database.list('retros');
    let allPhasesList = this.af.database.list('phases');

    retrosList.push(retro).then((pushedRetro) => {
      for (let x = 0; x < that.phases.length; x++) {
        that.phases[x].retroId = pushedRetro.key;
        allPhasesList.push(that.phases[x]);
      }

      this.af.database.list('phases', {
        query: {
          orderByChild: 'retroId',
          equalTo: pushedRetro.key
        }
      }).subscribe(orderedPhases => {
          let firstPhaseId = orderedPhases[0].$key;
          pushedRetro.update({ currentPhaseId: firstPhaseId });
        });

      that.router.navigate(['/retro/' + pushedRetro.key]);
      that.dialogRef.close();
    });
  }
}
