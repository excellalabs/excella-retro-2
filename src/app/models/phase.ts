import { Index } from './shared/index';

export class Phase {
  id: number;
  name: string;
  messages: Index[];
  groups: Index[];
  session: Index;

  constructor(id: number, name: string, messages: Index[], groups: Index[], session: Index) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.groups = groups;
    this.session = session;
  }
}
