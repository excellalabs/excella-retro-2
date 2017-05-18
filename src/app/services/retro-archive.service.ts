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
import '../shared/rxjs-operators';

@Injectable()
export class RetroArchiveService {
  private archivedRetroObservable: FirebaseObjectObservable<any>;
  private archivedRetro: ArchivedRetro;
  private retroObservable: FirebaseObjectObservable<Retro>;
  private retro: Retro;
  private phasesObservable: FirebaseListObservable<Phase[]>;
  private phases: Phase[];
  private groupsObservable: FirebaseListObservable<Group[]>;
  private groups: Group[];
  private messagesObservable: FirebaseListObservable<Message[]>;
  private messages: Message[];
  private allVotesObservable: FirebaseListObservable<Vote[]>;
  private allVotes: Vote[];
  private votesForGroup: Vote[];

  constructor(private af: AngularFire) { }

  async getArchivedRetroById(archivedRetroVal, retroId: string) {
    return await this.createArchivedRetro(retroId);
  }

  async createArchivedRetro(retroId: string) {
    let archivedRetro: ArchivedRetro;

    this.createObservables(retroId);

    await this.retroObservable.take(1).toPromise().then(retroVal => this.retro = retroVal);
    await this.phasesObservable.take(1).toPromise().then(phasesVal => this.phases = phasesVal);
    await this.groupsObservable.take(1).toPromise().then(groupsVal => this.groups = groupsVal);
    await this.messagesObservable.take(1).toPromise().then(messagesVal => this.messages = messagesVal);
    await this.retroObservable.take(1).toPromise().then(retroVal => this.retro = retroVal);
    await this.allVotesObservable.take(1).toPromise().then(votesVal => this.allVotes = votesVal);

    this.af.database.list('archivedRetros')
      .push(this.mapRetroToArchive())
      .then(archivedRetroVal => {
        this.deleteExistingObjects(retroId);
        archivedRetro = archivedRetroVal;
      });


    return archivedRetro;
  }

  private createObservables(retroId: string): void {
    this.getRetroObservable(retroId);
    this.getPhasesObservable(retroId);
    this.getGroupsObservable(retroId);
    this.getMessagesObservable(retroId);
    this.getVotesObservable(retroId);
  }

  private mapRetroToArchive(): ArchivedRetro {
    const archivedRetro = new ArchivedRetro();

    archivedRetro.retroId = this.retro.$key;
    archivedRetro.adminId = this.retro.adminId;
    archivedRetro.archivedPhases = this.mapPhasesToArchive();

    return archivedRetro;
  }

  private deleteExistingObjects(retroId: string): void {
    // Delete phase objects
    this.phasesObservable.remove();

    // Delete group objects
    this.groupsObservable.remove();

    // Delete message objects
    this.messagesObservable.remove();

    // Delete vote objects
    this.allVotesObservable.remove();
  }

  private getRetroObservable(retroId: string): void {
    this.retroObservable = this.af.database.object('retros/' + retroId);
  }

  private getPhasesObservable(retroId: string): void {
    this.phasesObservable = this.af.database.list('phases', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    });
  }

  private getGroupsObservable(retroId: string): void {
    this.groupsObservable = this.af.database.list('groups', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    });
  }

  private getMessagesObservable(retroId: string): void {
    this.messagesObservable = this.af.database.list('messages', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
    });
  }

  private getVotesObservable(retroId: string): void {
    this.allVotesObservable = this.af.database.list('votes', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId
      }
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
      const votesByGroup = this.allVotes.filter(vote => {
        return vote.groupId = groupInPhase.$key;
      });

      archivedGroup.groupId = groupInPhase.$key;
      archivedGroup.name = groupInPhase.name;
      archivedGroup.numOfVotes = votesByGroup.length;
      archivedGroup.archivedMessages = this.mapMessagesToArchivedGroup(archivedGroup.groupId);
      archivedGroups.push(archivedGroup);
    });

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
}
