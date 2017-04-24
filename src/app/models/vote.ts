export class Vote {
  groupId: string;
  userId: string;
  phaseId: string;
  $key: string;

  constructor(groupId: string, userId: string, phaseId: string) {
    this.groupId = groupId;
    this.userId = userId;
    this.phaseId = phaseId;
  }
}
