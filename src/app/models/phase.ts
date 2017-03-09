import { Message } from './message';
import { Group } from './group';

export class Phase {
  id: number;
  name: string;
  sessionId: number;
  messages: Message[];
  groups: Group[];

  constructor(id: number, name: string, sessionId: number) {
    this.id = id;
    this.name = name;
    this.sessionId = sessionId;
  }
}
