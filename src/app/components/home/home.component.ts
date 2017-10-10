import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { JoinRetroFormComponent } from '../join-retro-form/join-retro-form.component';
import { CreateRetroFormComponent } from '../create-retro-form/create-retro-form.component';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  constructor(public dialog: MatDialog, private af: AngularFire, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.af.auth.subscribe(user => {
        if(user) {
          this.user = user;
        }
        else {
          this.user = null;
        }
    });
   }

  openJoinRetroFormDialog() {
    this.dialog.open(JoinRetroFormComponent);
  }

  openCreateRetroFormDialog(){
    if(this.user){
     this.dialog.open(CreateRetroFormComponent);
    } else {
       this.snackBar.open("Must be logged in to create a retro", "OK", {
        duration: 2000,
      });
    }
  }

}