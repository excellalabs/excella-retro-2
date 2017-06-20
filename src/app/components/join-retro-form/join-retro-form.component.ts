import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-join-retro-form',
  templateUrl: './join-retro-form.component.html'
})
export class JoinRetroFormComponent {
  retroId: string;
  usersList: FirebaseListObservable<User>;
  currentUserId: string;

  constructor(
      private router: Router,
      private dialogRef: MdDialogRef<JoinRetroFormComponent>,
      private af: AngularFire,
      private localStorageService: LocalStorageService
  ) {}

  joinRetro(retroId: string) {
    this.currentUserId = localStorage.getItem('currentUserId');
    if (this.currentUserId == null) {
      var newUser = this.af.database.list('users').push({
        retroId: retroId
      });
      localStorage.setItem('currentUserId', newUser.key);
    }

    this.router.navigate(['/retro/' + retroId]);
    this.dialogRef.close();
  }
}
