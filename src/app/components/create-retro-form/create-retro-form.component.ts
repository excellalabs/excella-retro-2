import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { Retro } from '../../models/retro';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-create-retro-form',
  templateUrl: './create-retro-form.component.html',
})

export class CreateRetroFormComponent {
  retroName: string;
  af;

  constructor(af: AngularFire, private router: Router, private dialogRef: MdDialogRef<CreateRetroFormComponent>)
  {
    this.af = af;
  }

  createRetro(retroName: string) {
    var that = this;
    var retro = new Retro(retroName, true, '1', 2);
    var retros = this.af.database.list('retro');
    var retroId = retros.push(retro).then((item) => {
       that.router.navigate(['/retro/' + item.key]);
       that.dialogRef.close();
    });
  }
}
