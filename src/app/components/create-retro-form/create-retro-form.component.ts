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

  constructor(af: AngularFire, private router: Router, private dialogRef: MdDialogRef<CreateRetroFormComponent>)
  {
    this.af = af;
    while(this.phases.length < 3){
      this.addPhase();
    }
  }

  addPhase(){
    this.phases.push(new Phase("", 1, "", this.phases.length + 1));
  }

  removePhase(){
    this.phases.splice(-1);
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
