import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SubmitFeedbackComponent implements OnInit {
  message = this.blankMessage();
  feedbackList: {}[] = [
    { text: 'Test message 1 for the feedback list.' },
    { text: 'Test message 2 for the feedback list.' },
    { text: 'Test message 3 for the feedback list.' }
  ];

  constructor(private af: AngularFire) { }

  ngOnInit() {
  }

  submitFeedback() {
    const messageToSubmit = this.message;
    if (messageToSubmit.text !== '') {
      this.feedbackList.push(messageToSubmit);
      this.message = this.blankMessage();
    }
  }

  blankMessage(): Message {
    return new Message('', '1', '1', '123abc');
  }

}
