import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Retro } from '../../../models/retro';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-group-feedback',
  templateUrl: './group-feedback.component.html',
  styleUrls: ['./group-feedback.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class GroupFeedbackComponent implements OnInit {
  @Input() data: FirebaseObjectObservable<Retro>;
  retroObservable: FirebaseObjectObservable<Retro>;
  retro: Retro;
  retroId: string;
  feedbackMessagesObservable: FirebaseListObservable<Message[]>;
  feedbackMessages: Message[];
  
  constructor(private af: AngularFire) { }

  ngOnInit() {
    const self = this;
    this.data.subscribe(retroVal => {
      self.retroId = retroVal.$key;
      self.feedbackMessagesObservable = self.af.database.list('/messages');
      self.feedbackMessagesObservable.subscribe(feedbackMessages => {
        self.feedbackMessages = feedbackMessages.filter((feedback) => {
          return feedback.retroId === self.retroId;
        })
      })
    }
    );
  }

}
