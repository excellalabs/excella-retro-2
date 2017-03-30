import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SubmitFeedbackComponent implements OnInit {
  feedbackList: {}[] = [
    { message: "Test message 1 for the feedback list." },
    { message: "Test message 2 for the feedback list." },
    { message: "Test message 3 for the feedback list." }
  ];

  constructor() { }

  ngOnInit() {
  }

}
