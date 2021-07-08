import { Component } from '@angular/core'
import { AngularFire, FirebaseListObservable } from '@angular/fire'
import { MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-2-local-storage'

import { User } from '../../models/user'

@Component({
  selector: 'app-join-retro-form',
  templateUrl: './join-retro-form.component.html',
})
export class JoinRetroFormComponent {
  retroId: string
  usersList: FirebaseListObservable<User>
  currentUserId: string

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<JoinRetroFormComponent>,
    private af: AngularFire,
    private localStorageService: LocalStorageService
  ) {}

  joinRetro(retroId: string) {
    this.currentUserId = localStorage.getItem('currentUserId')
    if (this.currentUserId == null) {
      var newUser = this.af.database.list('users').push({
        retroId: retroId,
      })
      localStorage.setItem('currentUserId', newUser.key)
    }

    this.router.navigate(['/retro/' + retroId])
    this.dialogRef.close()
  }
}
