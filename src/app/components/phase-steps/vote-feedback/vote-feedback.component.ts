import { Component, OnInit, OnDestroy, Input, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../../../models/message';
import { Retro } from '../../../models/retro';
import { Group } from '../../../models/group';
import { Vote } from '../../../models/vote';
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
  dataSubscription: Subscription;
  votesSubscription: Subscription;
  groups: Group[];
  private votes: Vote[];
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
        self.currentPhaseId = retro.currentPhaseId;

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
        phaseId: this.currentPhaseId
      };
      this.votesObservable.push(newVote);
    }
  }

  getVoteCount(group: Group) {
    if (this.votes != null) {
      return this.votes.filter(vote => vote.groupId === group.$key).length;
    }
    return 0;
  }
}
