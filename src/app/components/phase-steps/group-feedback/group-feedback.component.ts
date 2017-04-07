import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Retro } from '../../../models/retro';
import { Group } from '../../../models/group';
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
  groupsObservable: FirebaseListObservable<Group[]>;
  feedbackMessages: Message[];
  ungroupedFeedbackMessages: Message[];
  groups: Group[];
  
  constructor(private af: AngularFire) { }

  ngOnInit() {
    const self = this;
    this.data.subscribe(retroVal => {
      self.retroId = retroVal.$key;

      self.feedbackMessagesObservable = self.af.database.list('/messages', {
        query: {
          orderByChild: 'retroId',
          equalTo: self.retroId
        }
      });
      self.feedbackMessagesObservable.subscribe(feedbackMessages => {
        self.feedbackMessages = feedbackMessages;
        self.ungroupedFeedbackMessages = feedbackMessages.filter(feedback => {
          return feedback.groupId === null || feedback.groupId === undefined;
        })
      });

      self.groupsObservable = self.af.database.list('/groups', {
        query: {
          orderByChild: 'retroId',
          equalTo: self.retroId
        }
      });
      self.groupsObservable.subscribe(groups => {
        self.groups = groups;
      });

    }
    );
  }

}
