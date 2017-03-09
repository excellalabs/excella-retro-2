import { Index } from './shared/index';

export class Vote {
  id: number;
  group: Index;
  userId: string;

  constructor(id: number, group: Index, userId: string) {
    this.id = id;
    this.group = group;
    this.userId = userId;
  }
}
