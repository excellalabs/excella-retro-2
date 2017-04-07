import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { JoinRetroFormComponent } from '../join-retro-form/join-retro-form.component';
import { CreateRetroFormComponent } from '../create-retro-form/create-retro-form.component';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  user;
  constructor(public dialog: MdDialog, private af: AngularFire, public snackBar: MdSnackBar) {}

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