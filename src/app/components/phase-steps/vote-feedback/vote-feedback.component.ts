import { Component, OnInit, OnDestroy, Input, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../../../models/message';
import { Retro } from '../../../models/retro';
import { Group } from '../../../models/group';
import { Vote } from '../../../models/vote';
import { Phase } from '../../../models/phase';
import { ChildComponentData } from '../../../models/child-component-data';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-vote-feedback-component',
  templateUrl: './vote-feedback.component.html',
  styleUrls: ['./vote-feedback.component.css']
})
export class VoteFeedbackComponent implements OnInit, OnDestroy {
  votesObservable: FirebaseListObservable<Vote[]>;
  groupsObservable: FirebaseListObservable<Group[]>;
  currentPhaseObservable: FirebaseObjectObservable<Phase>;
  dataSubscription: Subscription;
  votesSubscription: Subscription;
  groups: Group[];
  private votes: Vote[];
  retroId: string;
  retroName: string;
  currentPhaseId: string;
  votesRemaining: number;
  currentUserId: string; // Temporary
  @Input() data: ChildComponentData;

  constructor(
    private af: AngularFire,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
      const self = this;
      this.currentUserId = localStorage.getItem('currentUserId');

      this.dataSubscription = this.data.retroObservable.subscribe(retro => {
        self.retroName = retro.name;
        self.retroId = retro.$key;
        self.currentPhaseId = retro.currentPhaseId;

        this.currentPhaseObservable = this.data.currentPhaseObservable;

        self.votesObservable = self.af.database.list('votes',
          { query: { orderByChild: 'userId', equalTo: self.currentUserId } });

        self.votesSubscription = self.votesObservable.subscribe(votesList => {
          self.votes = votesList;
          const currentPhaseVotes = self.votes.filter(vote => vote.phaseId === retro.currentPhaseId);
          self.votesRemaining = retro.votesPerParticipant - currentPhaseVotes.length;
        });

        self.af.database.list('groups', { query: { orderByChild: 'phaseId', equalTo: retro.currentPhaseId } })
          .subscribe(groupList => { self.groups = groupList; });
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.votesSubscription.unsubscribe();
  }

  addVote(group: Group) {
    if (this.votesRemaining > 0) {
      const newVote = {
        groupId: group.$key,
        userId: this.currentUserId,
        phaseId: this.currentPhaseId,
        retroId: this.retroId
      };
      this.votesObservable.push(newVote);
    }
  }

  getVotesByGroupId(groupKey: string) {
    return this.votes.filter(vote => vote.groupId === groupKey);
  }

  removeVote(group: Group) {
    if (this.getVoteCount(group) > 0) {
      const votes = this.getVotesByGroupId(group.$key);
      this.votesObservable.remove(votes[0].$key);
    }
  }

  getVoteCount(group: Group) {
    if (this.votes != null) {
      return this.getVotesByGroupId(group.$key).length;
    }
    return 0;
  }
}
