import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable , FirebaseListObservable } from 'angularfire2';
import { ArchivedRetro } from '../models/archive/archived-retro';
import { ArchivedPhase } from '../models/archive/archived-phase';
import { ArchivedGroup } from '../models/archive/archived-group';
import { ArchivedMessage } from '../models/archive/archived-message';
import { Retro } from '../models/retro';
import { Phase } from '../models/phase';
import { Message } from '../models/message';
import { Group } from '../models/group';
import { Vote } from '../models/vote';

@Injectable()
export class RetroArchiveService {
  archivedRetroObservable: FirebaseObjectObservable<any>;
  retro: Retro;
  phases: Phase[];
  groups: Group[];
  messages: Message[];
  votes: Vote[];

  constructor(private af: AngularFire) { }

  getArchivedRetroById(retroId: string) {
    this.archivedRetroObservable = this.af.database.object('archivedRetros/' + retroId);
    const archivedRetroSubscription = this.archivedRetroObservable.subscribe(archivedRetroVal => {
      if (archivedRetroVal.$exists()) {
        return archivedRetroVal;
      } else {
        archivedRetroSubscription.unsubscribe();
        this.createArchivedRetro(retroId);
        // TODO: Return archived retro
      }
    });
  }

  createArchivedRetro(retroId: string) {
    this.getRetro(retroId);
    this.getPhases(retroId);
    this.getGroups(retroId);
    this.getMessages(retroId);

    const archivedRetro = this.mapRetroToArchive();
  }

  getRetro(retroId: string): void {
    this.af.database.object('retros/' + retroId).subscribe(retroVal => {
      this.retro = retroVal;
    });
  }

  getPhases(retroId: string): void {
    this.af.database.list('phases', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    }).subscribe(phasesVal => {
      this.phases = phasesVal;
    });
  }

  getGroups(retroId: string): void {
    this.af.database.list('groups', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    }).subscribe(groupsVal => {
      this.groups = groupsVal;
    });
  }

  getMessages(retroId: string): void {
    this.af.database.list('messages', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    }).subscribe(messagesVal => {
      this.messages = messagesVal;
    });
  }

  mapRetroToArchive(): ArchivedRetro {
    const archivedRetro = new ArchivedRetro();
    archivedRetro.retroId = this.retro.$key;
    archivedRetro.adminId = this.retro.adminId;
    archivedRetro.archivedPhases = this.mapPhasesToArchive();
    return archivedRetro;
  }

  mapPhasesToArchive(): ArchivedPhase[] {
    const archivedPhases = new Array<ArchivedPhase>();
    this.phases.forEach(phase => {
      const archivedPhase = new ArchivedPhase;
      archivedPhase.phaseId = phase.$key;
      archivedPhase.name = phase.name;
      archivedPhase.phaseOrder = phase.order;
      archivedPhase.archivedGroups = this.mapGroupsToArchive(archivedPhase.phaseId);
      archivedPhases.push(archivedPhase);
    });
    return archivedPhases;
  }

  mapGroupsToArchive(phaseId: string): ArchivedGroup[] {
    const archivedGroups = new Array<ArchivedGroup>();
    const groupsInPhase = this.groups.filter(group => {
      return group.phaseId === phaseId;
    });
    groupsInPhase.forEach(groupInPhase => {
      const archivedGroup = new ArchivedGroup;
      archivedGroup.groupId = groupInPhase.$key;
      archivedGroup.name = groupInPhase.name;
      archivedGroup.numOfVotes = this.getNumOfVotesForGroup(archivedGroup.groupId);
      archivedGroup.archivedMessages = this.mapMessagesToArchivedGroup(archivedGroup.groupId);
    });
    this.addUngroupMessasgesGroup(phaseId);
  }

  getNumOfVotesForGroup(groupId: string): number {
    this.af.database.list('votes', {
      query: {
        orderByChild: 'groupId',
        equalTo: groupId
      }
    }).subscribe(votesVal => {
      this.votes = votesVal;
    });
    return this.votes.length;
  }

  addUngroupedFeedbackGroup(phaseId: string): ArchivedGroup {

  }
}
