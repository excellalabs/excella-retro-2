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
  retroId: string;
  af;

  constructor(af: AngularFire, private router: Router, private dialogRef: MdDialogRef<CreateRetroFormComponent>)
  {
    this.af = af;
  }

  createRetro(retroId: string) {
    var retro = new Retro(retroId, true, '1', 2);
    var retros = this.af.database.list('retro');
    retros.push(retro);
    this.router.navigate(['/retro/' + retroId]);
    this.dialogRef.close();
  }
}
