import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';
import { Retro } from '../../../models/retro';
import { Group } from '../../../models/group';
import { Message } from '../../../models/message';
import { Phase } from '../../../models/phase';
import { ChildComponentData } from '../../../models/child-component-data';

@Component({
  selector: 'app-group-feedback',
  templateUrl: './group-feedback.component.html',
  styleUrls: ['./group-feedback.component.css']
})
export class GroupFeedbackComponent implements OnInit, OnDestroy {
  @Input() data: ChildComponentData;
  retroSubscription: Subscription;
  feedbackSubscription: Subscription;
  groupsSubscription: Subscription;
  retroObservable: FirebaseObjectObservable<Retro>;
  currentPhaseObservable: FirebaseObjectObservable<Phase>;
  retro: Retro;
  retroId: string;
  feedbackMessagesObservable: FirebaseListObservable<Message[]>;
  groupsObservable: FirebaseListObservable<Group[]>;
  feedbackMessages: Message[];
  ungroupedFeedbackMessages: Message[];
  groups: Group[];
  newGroupName: string;
  enabledGroup: string;
  allowAdminFunctions: boolean;
  user: any;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    const self = this;
    this.enabledGroup = '';
    this.currentPhaseObservable = this.data.currentPhaseObservable;
    this.retroSubscription = this.data.retroObservable.subscribe(retroVal => {
      self.retroId = retroVal.$key;
      self.retro = retroVal;
      self.feedbackMessagesObservable = self.af.database.list('/messages', {
        query: {
          orderByChild: 'retroId',
          equalTo: self.retroId
        }
      });
      self.feedbackSubscription = self.feedbackMessagesObservable.subscribe(feedbackMessages => {
        self.feedbackMessages = feedbackMessages;
        self.ungroupedFeedbackMessages = feedbackMessages.filter(feedback => {
          return feedback.phaseId === self.retro.currentPhaseId
            && (feedback.groupId === null || feedback.groupId === undefined || feedback.groupId === '');
        });
      });

    this.af.auth.subscribe(user => {
      if (user) {
        self.user = user;
        self.allowAdminFunctions = (self.user.auth.uid === self.retro.adminId);
      } else {
        self.user = null;
        self.allowAdminFunctions = false;
      }
    });

      self.groupsObservable = self.af.database.list('/groups', {
        query: {
          orderByChild: 'retroId',
          equalTo: self.retroId
        }
      });
      this.groupsSubscription = self.groupsObservable.subscribe(groups => {
        self.groups = groups.filter(group => {
          return group.phaseId === self.retro.currentPhaseId
        });
      });
    });
  }

  createNewGroup(newGroupName: string) {
    if (newGroupName) {
      let group = new Group(newGroupName, this.retro.currentPhaseId, this.retro.$key);
      this.groupsObservable.push(group);
      this.newGroupName = '';
    }
  }

  onNotify(groupId: string) {
    this.enabledGroup = groupId;
  }

  ngOnDestroy() {
    this.ungroupedFeedbackMessages.forEach(msg => {
      this.createNewGroup(msg.text)
    })

    this.retroSubscription.unsubscribe();
    this.feedbackSubscription.unsubscribe();
    this.groupsSubscription.unsubscribe();
  }
}
