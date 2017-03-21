export class Vote {
  groupId: string;
  userId: string;

  constructor(groupId: string, userId: string) {
    this.groupId = groupId;
    this.userId = userId;
  }
}
