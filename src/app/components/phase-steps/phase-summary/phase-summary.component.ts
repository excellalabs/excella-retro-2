import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2";
import { Component, Input, OnInit } from "@angular/core";

import { ChildComponentData } from "../../../models/child-component-data";
import { Group } from "../../../models/group";
import { Phase } from "../../../models/phase";
import { Vote } from "../../../models/vote";

@Component({
  selector: "app-phase-summary",
  templateUrl: "./phase-summary.component.html",
  styleUrls: ["./phase-summary.component.css"]
})
export class PhaseSummaryComponent implements OnInit {
  @Input() data: ChildComponentData;
  retroId: string;
  currentPhaseId: string;
  currentPhase: Phase;
  groups: Group[];
  totalVotes: Vote[];

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const self = this;
    this.data.retroObservable.subscribe(retroVal => {
      self.retroId = retroVal.$key;
      self.currentPhaseId = retroVal.currentPhaseId;
      self.af.database
        .object("phases/" + self.currentPhaseId)
        .subscribe(currentPhaseVal => {
          self.currentPhase = currentPhaseVal;
          self.af.database
            .list("groups", {
              query: {
                orderByChild: "phaseId",
                equalTo: self.currentPhaseId
              }
            })
            .subscribe(groupsVal => {
              self.groups = groupsVal;
              self.af.database
                .list("votes", {
                  query: {
                    orderByChild: "phaseId",
                    equalTo: self.currentPhaseId
                  }
                })
                .subscribe(votesList => {
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
