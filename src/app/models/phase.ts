import { Message } from './message';
import { Group } from './group';

export class Phase {
  id: number;
  name: string;
  messages: Message[];
  groups: Group[];
  sessionId: number;

  constructor(id: number, name: string, messages: Message[], groups: Group[], sessionId: number) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.groups = groups;
    this.sessionId = sessionId;
  }
}
