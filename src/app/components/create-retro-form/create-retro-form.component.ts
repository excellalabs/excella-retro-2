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
  numberOfVotes;
  numberOfPhases = 3;
  phases = [];
  af;

  constructor(af: AngularFire, private router: Router, private dialogRef: MdDialogRef<CreateRetroFormComponent>)
  {
    this.af = af;
    this.changeNumberOfPhases(this.numberOfPhases);
  }

  changeNumberOfPhases($event){
    if($event > this.phases.length){
      for(var x = this.phases.length; x < $event; x++){
        this.phases.push(new Phase("", 1, "", this.phases.length + 1))
      }
    } else if($event < this.phases.length ){
      this.phases.splice($event-this.phases.length);
    }
  }

  createRetro(retroName: string) {
    var that = this;
    var retro = new Retro(retroName, true, '1', this.numberOfVotes);
    var retrosList = this.af.database.list('retros');
    var phasesList = this.af.database.list('phases');
    var retroId = retrosList.push(retro).then((pushedRetro) => {
      for(var x = 0; x < that.phases.length; x++){
        that.phases[x].retroId = pushedRetro.key;
        phasesList.push(that.phases[x])
      }
       that.router.navigate(['/retro/' + pushedRetro.key]);
       that.dialogRef.close();
    });
  }
}
