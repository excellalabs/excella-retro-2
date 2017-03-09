import { Index } from './shared/index';

export class Phase {
  id: number;
  name: string;
  messages: Index[];
  groups: Index[];
  sessionId: number;

  constructor(id: number, name: string, messages: Index[], groups: Index[], sessionId: number) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.groups = groups;
    this.sessionId = sessionId;
  }
}
