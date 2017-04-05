import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Retro } from '../../../models/retro';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SubmitFeedbackComponent implements OnInit {
  @Input() data: any;
  retroObservable: FirebaseObjectObservable<Retro>;
  retroVal: Retro;
  existingFeedbackObservable: FirebaseListObservable<Message[]>;
  existingFeedbackVal: Message[];
  phaseId: string;
  retroId: string;
  feedbackToSubmit = this.blankFeedback();

  constructor(private af: AngularFire) { }

  ngOnInit() {
    const self = this;
    this.retroObservable = this.data;
    this.retroObservable.subscribe(retroVal => {
      self.retroVal = retroVal;
      self.retroId = retroVal.$key;
      self.phaseId = null;
      self.existingFeedbackObservable = self.af.database.list('messages');
      self.existingFeedbackObservable.subscribe(existingFeedbackVal => {
        self.existingFeedbackVal = existingFeedbackVal;
        self.existingFeedbackVal = self.existingFeedbackVal.filter((feedback) => {
          return feedback.retroId === self.retroId
            /*&& feedback.phaseId === self.phaseVal.$key*/;
        });
      });
    });
  }

  submitFeedback() {
    if (this.feedbackToSubmit.text !== '') {
      this.feedbackToSubmit.retroId = this.retroId;
      this.feedbackToSubmit.phaseId = this.phaseId;
      this.existingFeedbackObservable.push(this.feedbackToSubmit);

      this.feedbackToSubmit = this.blankFeedback();
    }
  }

  blankFeedback(): Message {
    return new Message('', null, this.phaseId, this.retroId);
  }

}
