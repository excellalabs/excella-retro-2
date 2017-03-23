import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material'

@Component({
  selector: 'join-retro-form',
  templateUrl: './join-retro-form.component.html',
})
export class JoinRetroFormComponent {
    private retroId: string

  constructor(
      private router: Router,
      private dialogRef: MdDialogRef<JoinRetroFormComponent>
  ) {}

  joinRetro(retroId: string) {
    this.router.navigate(['/retro/' + retroId]);
    this.dialogRef.close();
  }

}