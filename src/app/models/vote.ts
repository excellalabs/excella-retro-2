export class Vote {
  groupId: string;
  userId: string;
  $key: string;

  constructor(groupId: string, userId: string) {
    this.groupId = groupId;
    this.userId = userId;
  }
}
