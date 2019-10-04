export class Vote {
  groupId: string
  userId: string
  phaseId: string
  retroId: string
  $key: string

  constructor(groupId: string, userId: string, phaseId: string, retroId: string) {
    this.groupId = groupId
    this.userId = userId
    this.phaseId = phaseId
    this.retroId = retroId
  }
}
