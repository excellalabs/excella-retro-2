import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { MatDialog, MatSnackBar } from '@angular/material'
import { auth } from 'firebase/app'

import { CreateRetroFormComponent } from '../create-retro-form/create-retro-form.component'
import { JoinRetroFormComponent } from '../join-retro-form/join-retro-form.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user
  constructor(
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.afAuth.auth.subscribe(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }

  openJoinRetroFormDialog() {
    this.dialog.open(JoinRetroFormComponent)
  }

  openCreateRetroFormDialog() {
    if (this.user) {
      this.dialog.open(CreateRetroFormComponent)
    } else {
      this.afAuth.auth
        .signInWithPopup(new auth.GoogleAuthProvider())()
        .then(sucess => {
          this.dialog.open(CreateRetroFormComponent)
        })
        .catch(err => {
          this.snackBar.open('Must be logged in to create a retro', 'OK', {
            duration: 2000,
          })
        })
    }
  }
}
