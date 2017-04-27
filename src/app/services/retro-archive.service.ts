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
  archivedRetro: ArchivedRetro;
  retro: Retro;
  phasesObservable: FirebaseListObservable<Phase[]>;
  phases: Phase[];
  groupsObservable: FirebaseListObservable<Group[]>;
  groups: Group[];
  messagesObservable: FirebaseListObservable<Message[]>;
  messages: Message[];
  allVotesObservable: FirebaseListObservable<Vote[]>;
  allVotes: Vote[];
  votesForGroup: Vote[];

  constructor(private af: AngularFire) { }

  getArchivedRetroById(retroId: string) {
    this.archivedRetroObservable = this.af.database.object('archivedRetros/' + retroId);
    const archivedRetroSubscription = this.archivedRetroObservable.subscribe(archivedRetroVal => {
      if (archivedRetroVal.$exists()) {
        return archivedRetroVal;
      } else {
        archivedRetroSubscription.unsubscribe();
        this.createArchivedRetro(retroId);
      }
    });
  }

  createArchivedRetro(retroId: string): ArchivedRetro {
    // Get existing data objects
    this.getExistingObjects(retroId);

    // Create archived-retro object and push to Firebase
    this.af.database.list('archivedRetros')
      .push(this.mapRetroToArchive())
      .then(archivedRetro => { this.archivedRetro = archivedRetro; });

    // Delete existing data objects
    this.deleteExistingObjects(retroId);

    // Return archived retro
    return this.archivedRetro;
  }

  getExistingObjects(retroId: string): void {
    this.getRetro(retroId);
    this.getPhases(retroId);
    this.getGroups(retroId);
    this.getMessages(retroId);
  }

  mapRetroToArchive(): ArchivedRetro {
    const archivedRetro = new ArchivedRetro();

    archivedRetro.retroId = this.retro.$key;
    archivedRetro.adminId = this.retro.adminId;
    archivedRetro.archivedPhases = this.mapPhasesToArchive();

    return archivedRetro;
  }

  deleteExistingObjects(retroId: string): void {
    // Delete phase objects
    this.phasesObservable.remove();

    // Delete group objects
    this.groupsObservable.remove();

    // Delete message objects
    this.messagesObservable.remove();

    // Delete vote objects
    this.allVotesObservable.remove();
  }

  private getRetro(retroId: string): void {
    this.af.database.object('retros/' + retroId).subscribe(retroVal => {
      this.retro = retroVal;
    });
  }

  private getPhases(retroId: string): void {
    this.phasesObservable = this.af.database.list('phases', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    });

    this.phasesObservable.subscribe(phasesVal => {
      this.phases = phasesVal;
    });
  }

  private getGroups(retroId: string): void {
    this.groupsObservable = this.af.database.list('groups', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    });

    this.groupsObservable.subscribe(groupsVal => {
      this.groups = groupsVal;
    });
  }

  private getMessages(retroId: string): void {
    this.messagesObservable = this.af.database.list('messages', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    });

    this.messagesObservable.subscribe(messagesVal => {
      this.messages = messagesVal;
    });
  }

  private getVotes(retroId: string): void {
    this.allVotesObservable = this.af.database.list('votes', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    });

    this.allVotesObservable.subscribe(votesVal => {
      this.allVotes = votesVal;
    });
  }

  private mapPhasesToArchive(): ArchivedPhase[] {
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

  private mapGroupsToArchive(phaseId: string): ArchivedGroup[] {
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

      archivedGroups.push(archivedGroup);
    });

    archivedGroups.push(this.addUngroupedFeedbackGroup(phaseId));

    return archivedGroups;
  }

  private mapMessagesToArchivedGroup(groupId: string): ArchivedMessage[] {
    const archivedMessages = new Array<ArchivedMessage>();
    const messagesInGroup = this.messages.filter(message => {
      return message.groupId === groupId;
    });

    messagesInGroup.forEach(messageInGroup => {
      const archivedMessage = new ArchivedMessage;
      archivedMessage.messageId = messageInGroup.$key;
      archivedMessage.text = messageInGroup.text;

      archivedMessages.push(archivedMessage);
    });

    return archivedMessages;
  }

  private mapUngroupedMessagesToArchive(phaseId: string): ArchivedMessage[] {
    const archivedMessages = new Array<ArchivedMessage>();
    const ungroupedMessages = this.messages.filter(message => {
      return message.groupId === null;
    });

    ungroupedMessages.forEach(ungroupedMessage => {
      const archivedMessage = new ArchivedMessage();
      archivedMessage.messageId = ungroupedMessage.$key;
      archivedMessage.text = ungroupedMessage.text;
    });

    return archivedMessages;
  }

  private getNumOfVotesForGroup(groupId: string): number {
    this.af.database.list('votes', {
      query: {
        orderByChild: 'groupId',
        equalTo: groupId
      }
    }).subscribe(votesVal => {
      this.votesForGroup = votesVal;
    });
    return this.votesForGroup.length;
  }

  private addUngroupedFeedbackGroup(phaseId: string): ArchivedGroup {
    const ungroupedFeedbackGroup = new ArchivedGroup();

    ungroupedFeedbackGroup.name = 'Ungrouped Feedback';
    ungroupedFeedbackGroup.numOfVotes = 0;
    ungroupedFeedbackGroup.archivedMessages = this.mapUngroupedMessagesToArchive(phaseId);

    return ungroupedFeedbackGroup;
  }
}
