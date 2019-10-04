import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-end-retro',
  templateUrl: './end-retro.component.html',
  styleUrls: ['./end-retro.component.css'],
})
export class EndRetroComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EndRetroComponent>) {}

  ngOnInit() {}
}
