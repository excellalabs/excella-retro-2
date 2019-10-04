import '../shared/rxjs-operators'

import { Injectable } from '@angular/core'
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable,
} from '@angular/fire'

import { ArchivedGroup } from '../models/archive/archived-group'
import { ArchivedMessage } from '../models/archive/archived-message'
import { ArchivedPhase } from '../models/archive/archived-phase'
import { ArchivedRetro } from '../models/archive/archived-retro'
import { Group } from '../models/group'
import { Message } from '../models/message'
import { Phase } from '../models/phase'
import { Retro } from '../models/retro'
import { Vote } from '../models/vote'

@Injectable()
export class RetroArchiveService {
  private archivedRetroObservable: FirebaseObjectObservable<any>
  private archivedRetro: ArchivedRetro
  private retroObservable: any
  private retro: Retro
  private phasesObservable: any
  private phases: Phase[]
  private groupsObservable: any
  private groups: Group[]
  private messagesObservable: any
  private messages: Message[]
  private allVotesObservable: any
  private allVotes: Vote[]
  private votesForGroup: Vote[]

  constructor(private af: AngularFire) {}

  public async createArchivedRetro(retroId: string) {
    this.createObservables(retroId)

    this.retro = await this.retroObservable.first().toPromise()
    this.phases = await this.phasesObservable.first().toPromise()
    this.groups = await this.groupsObservable.first().toPromise()
    this.messages = await this.messagesObservable.first().toPromise()
    this.allVotes = await this.allVotesObservable.first().toPromise()

    return this.af.database.list('archivedRetros').push(this.mapRetroToArchive())
  }

  public deleteExistingObjects(retroId: string): void {
    var that = this
    // Delete phase objects
    this.phases.forEach(phase => {
      that.af.database.object('/phases/' + phase.$key).remove()
    })

    // Delete group objects
    this.groups.forEach(group => {
      that.af.database.object('/groups/' + group.$key).remove()
    })

    // Delete message objects
    this.messages.forEach(message => {
      that.af.database.object('/messages/' + message.$key).remove()
    })

    // Delete vote objects
    this.allVotes.forEach(vote => {
      that.af.database.object('/votes/' + vote.$key).remove()
    })
  }

  private createObservables(retroId: string): void {
    this.getRetroObservable(retroId)
    this.getPhasesObservable(retroId)
    this.getGroupsObservable(retroId)
    this.getMessagesObservable(retroId)
    this.getVotesObservable(retroId)
  }

  private mapRetroToArchive(): ArchivedRetro {
    const archivedRetro = new ArchivedRetro()

    archivedRetro.retroId = this.retro.$key
    archivedRetro.adminId = this.retro.adminId
    archivedRetro.archivedPhases = this.mapPhasesToArchive()

    return archivedRetro
  }

  private getRetroObservable(retroId: string): void {
    this.retroObservable = this.af.database.object('retros/' + retroId)
  }

  private getPhasesObservable(retroId: string): void {
    this.phasesObservable = this.af.database.list('phases', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId,
      },
    })
  }

  private getGroupsObservable(retroId: string): void {
    this.groupsObservable = this.af.database.list('groups', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId,
      },
    })
  }

  private getMessagesObservable(retroId: string): void {
    this.messagesObservable = this.af.database.list('messages', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId,
      },
    })
  }

  private getVotesObservable(retroId: string): void {
    this.allVotesObservable = this.af.database.list('votes', {
      query: {
        orderByChild: 'retroId',
        equalTo: retroId,
      },
    })
  }

  private mapPhasesToArchive(): ArchivedPhase[] {
    const archivedPhases = new Array<ArchivedPhase>()
    this.phases.forEach(phase => {
      const archivedPhase = new ArchivedPhase()
      archivedPhase.phaseId = phase.$key
      archivedPhase.name = phase.name
      archivedPhase.phaseOrder = phase.order
      archivedPhase.archivedGroups = this.mapGroupsToArchive(archivedPhase.phaseId)

      archivedPhases.push(archivedPhase)
    })

    return archivedPhases
  }

  private mapGroupsToArchive(phaseId: string): ArchivedGroup[] {
    const archivedGroups = new Array<ArchivedGroup>()
    const groupsInPhase = this.groups.filter(group => {
      return group.phaseId === phaseId
    })

    groupsInPhase.forEach(groupInPhase => {
      const archivedGroup = new ArchivedGroup()
      const votesByGroup = this.allVotes.filter(vote => {
        return vote.groupId === groupInPhase.$key
      })

      archivedGroup.groupId = groupInPhase.$key
      archivedGroup.name = groupInPhase.name
      archivedGroup.numOfVotes = votesByGroup.length
      archivedGroup.archivedMessages = this.mapMessagesToArchivedGroup(
        archivedGroup.groupId
      )
      archivedGroups.push(archivedGroup)
    })

    return archivedGroups
  }

  private mapMessagesToArchivedGroup(groupId: string): ArchivedMessage[] {
    const archivedMessages = new Array<ArchivedMessage>()
    const messagesInGroup = this.messages.filter(message => {
      return message.groupId === groupId
    })

    messagesInGroup.forEach(messageInGroup => {
      const archivedMessage = new ArchivedMessage()
      archivedMessage.messageId = messageInGroup.$key
      archivedMessage.text = messageInGroup.text

      archivedMessages.push(archivedMessage)
    })

    return archivedMessages
  }
}
