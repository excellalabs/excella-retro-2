import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { JoinRetroFormComponent } from '../join-retro-form/join-retro-form.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MdDialog
  ) {}

  ngOnInit() {
    
  }

  openJoinRetroFormDialog() {
    this.dialog.open(JoinRetroFormComponent);
  }

}