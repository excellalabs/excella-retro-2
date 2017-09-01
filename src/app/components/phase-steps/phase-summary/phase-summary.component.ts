import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ChildComponentData } from '../../../models/child-component-data';
import { Phase } from '../../../models/phase';
import { Group } from '../../../models/group';
import { Vote } from '../../../models/vote';
import '../../../shared/rxjs-operators';

@Component({
  selector: 'app-phase-summary',
  templateUrl: './phase-summary.component.html',
  styleUrls: ['./phase-summary.component.css']
})
export class PhaseSummaryComponent implements OnInit {
  @Input() data: ChildComponentData;
  retroId: string;
  currentPhaseId: string;
  currentPhase: Phase;
  groups: Group[];
  totalVotes: Vote[];

  constructor(private af: AngularFire) { }

  ngOnInit() {
    const self = this;
    this.data.retroObservable.subscribe(retroVal => {
      self.retroId = retroVal.$key;
      self.currentPhaseId = retroVal.currentPhaseId;
      self.af.database.object('phases/' + self.currentPhaseId).subscribe(currentPhaseVal => {
        self.currentPhase = currentPhaseVal;
        self.af.database.list('groups', {
          query: {
            orderByChild: 'phaseId',
            equalTo: self.currentPhaseId
          }
        }).subscribe(groupsVal => {
          self.groups = groupsVal;
          self.af.database.list('votes', {
            query: {
              orderByChild: 'phaseId',
              equalTo: self.currentPhaseId
            }
          }).subscribe(votesList => {
            self.totalVotes = votesList;
          });
        });
      });
    });
  }

  getVoteCountForGroup(group: Group) {
    if (this.totalVotes != null) {
      return this.totalVotes.filter(vote => vote.groupId === group.$key).length;
    }
    return 0;
  }
}
