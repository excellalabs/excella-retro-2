import { Index } from './shared/index';

export class Group {
  id: number;
  name: string;
  messages: Index[];
  votes: Index[];
  session: Index;

  constructor(id: number, name: string, messages: Index[], votes: Index[], session: Index) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.votes = votes;
    this.session = session;
  }
}
