import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-vote-feedback',
  templateUrl: './vote-feedback.component.html',
  styleUrls: ['./vote-feedback.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class VoteFeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
