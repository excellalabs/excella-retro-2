import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-end-retro',
  templateUrl: './end-retro.component.html',
  styleUrls: ['./end-retro.component.css']
})
export class EndRetroComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<EndRetroComponent>) { }

  ngOnInit() {
  }

}
