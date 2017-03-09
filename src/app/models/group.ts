import { Message } from './message';

export class Group {
  id: number;
  name: string;
  messages: Message[];
  votes: number;
  sessionId: number;

  constructor(id: number, name: string, messages: Message[], votes: number, sessionId: number) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.votes = votes;
    this.sessionId = sessionId;
  }
}
