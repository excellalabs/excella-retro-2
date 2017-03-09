import { Index } from './shared/index';

export class Vote {
  id: number;
  user: Index;
  group: Index;

  constructor(id: number, user: Index, group: Index) {
    this.id = id;
    this.user = user;
    this.group = group;
  }
}