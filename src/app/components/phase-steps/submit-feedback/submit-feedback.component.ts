import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Retro } from '../../../models/retro';
import { Message } from '../../../models/message';
import { LocalStorageService } from 'angular-2-local-storage';

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
  currentUserId: string;

  constructor(private af: AngularFire,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const self = this;
    this.currentUserId = localStorage.getItem('currentUserId');

    this.retroObservable = this.data;
    this.retroObservable.subscribe(retroVal => {
      self.retroVal = retroVal;
      self.retroId = retroVal.$key;
      self.phaseId = null;
      self.existingFeedbackObservable = self.af.database.list('messages', 
          { query: { orderByChild: "retroId", equalTo: self.retroId}});
      self.existingFeedbackObservable.subscribe(existingFeedbackVal => {
        self.existingFeedbackVal = existingFeedbackVal;
        self.existingFeedbackVal = self.existingFeedbackVal.filter((feedback) => {
          return feedback.userId === this.currentUserId
            /*&& feedback.phaseId === self.phaseVal.$key*/;
        });
      });
    });
  }

  submitFeedback() {
    if (this.feedbackToSubmit.text !== '') {
      this.feedbackToSubmit.retroId = this.retroId;
      this.feedbackToSubmit.phaseId = this.phaseId;
      this.feedbackToSubmit.userId = this.currentUserId;
      this.existingFeedbackObservable.push(this.feedbackToSubmit);

      this.feedbackToSubmit = this.blankFeedback();
    }
  }

  blankFeedback(): Message {
    return new Message('', null, this.phaseId, this.retroId, this.currentUserId);
  }

}
