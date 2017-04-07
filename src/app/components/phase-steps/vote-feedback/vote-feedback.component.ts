import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Pipe, PipeTransform } from '@angular/core';
import { Message } from '../../../models/message';
import { Retro } from '../../../models/retro';
import { Group } from '../../../models/group';
import { Vote } from '../../../models/vote';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'vote-feedback-component',
  templateUrl: './vote-feedback.component.html',
  styleUrls: ['./vote-feedback.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class VoteFeedbackComponent implements OnInit {
  votesObservable: FirebaseListObservable<Vote[]>;
  groupsObservable: FirebaseListObservable<Group[]>;
  groups: Group[];
  private votes: Vote[];
  retroName: string;
  currentPhaseId: string;
  votesRemaining: number;
  currentUserId: string; // Temporary
  @Input() data: FirebaseObjectObservable<Retro>;

  constructor(
    private af: AngularFire,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
      const self = this;
      this.currentUserId = localStorage.getItem('currentUserId');

      this.data.subscribe(retro => {
          this.retroName = retro.name;
          this.currentPhaseId = retro.currentPhaseId;

          this.votesObservable = this.af.database.list('votes', 
            { query: {orderByChild: "userId",equalTo: this.currentUserId }});

          this.votesObservable.subscribe(votesList => {
            this.votes = votesList;
            var currentPhaseVotes = this.votes.filter(vote => vote.phaseId === retro.currentPhaseId);
            this.votesRemaining = retro.votesPerParticipant - currentPhaseVotes.length
          })

          this.af.database.list('groups', { query: { orderByChild: "phaseId", equalTo: retro.currentPhaseId}})
            .subscribe(groupList => { this.groups = groupList; })
      })
  }

  addVote(group: Group) {
    if (this.votesRemaining > 0) {
      var newVote = {
        groupId: group.$key,
        userId: this.currentUserId,
        phaseId: this.currentPhaseId
      }
      this.votesObservable.push(newVote);
    }
  }

  getVoteCount(group: Group) {
    if (this.votes != null) {
      return this.votes.filter(vote => vote.groupId == group.$key).length;
    }
    return 0;
  }
}