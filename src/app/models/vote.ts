import { Index } from './shared/index';

export class Vote {
  id: number;
  group: Index;
  user: string;

  constructor(id: number, group: Index, user: string) {
    this.id = id;
    this.group = group;
    this.user = user;
  }
}