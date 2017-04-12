import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';
import { Retro } from '../../../models/retro';
import { Phase } from '../../../models/phase';
import { Message } from '../../../models/message';
import { ChildComponentData } from '../../../models/child-component-data';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.css']
})
export class SubmitFeedbackComponent implements OnInit, OnDestroy {
  @Input() data: ChildComponentData;
  retroObservable: FirebaseObjectObservable<Retro>;
  currentPhaseObservable: FirebaseObjectObservable<Phase>;
  existingFeedbackObservable: FirebaseListObservable<Message[]>;
  retroSubscription: Subscription;
  currentPhaseSubscription: Subscription;
  existingFeedbackSubscription: Subscription;
  retroVal: Retro;
  currentPhaseVal: Phase;
  existingFeedbackVal: Message[];
  retroId: string;
  phaseId: string;
  hasExistingMessages: boolean;
  feedbackToSubmit = this.blankFeedback();

  constructor(private af: AngularFire) { }

  ngOnInit() {
    const self = this;
    this.retroObservable = this.data.retroObservable;
    this.currentPhaseObservable = this.data.currentPhaseObservable;

    this.retroSubscription = this.retroObservable.subscribe(retroVal => {
      self.retroVal = retroVal;
      self.retroId = retroVal.$key;
      this.currentPhaseSubscription = self.currentPhaseObservable.subscribe(currentPhaseVal => {
        self.currentPhaseVal = currentPhaseVal;
        self.phaseId = currentPhaseVal.$key;
        self.currentPhaseSubscription.unsubscribe();
      });

      self.existingFeedbackObservable = self.af.database.list('messages');
      this.existingFeedbackSubscription = self.existingFeedbackObservable.subscribe(existingFeedbackVal => {
        self.existingFeedbackVal = existingFeedbackVal;
        self.existingFeedbackVal = self.existingFeedbackVal.filter((feedback) => {
          return feedback.retroId === self.retroId && feedback.phaseId === self.phaseId;
        });

        self.hasExistingMessages = self.existingFeedbackVal.length > 0;
      });
    });
  }

  ngOnDestroy() {
    this.retroSubscription.unsubscribe();
    this.existingFeedbackSubscription.unsubscribe();
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
