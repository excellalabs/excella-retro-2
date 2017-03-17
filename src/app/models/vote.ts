export class Vote {
  id: number;
  groupId: number;
  userId: string;

  constructor(id: number, groupId: number, userId: string) {
    this.id = id;
    this.groupId = groupId;
    this.userId = userId;
  }
}
