import { Index } from './shared/index';

export class Group {
  id: number;
  name: string;
  messages: Index[];
  votes: number;
  sessionId: number;

  constructor(id: number, name: string, messages: Index[], votes: number, sessionId: number) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.votes = votes;
    this.sessionId = sessionId;
  }
}
