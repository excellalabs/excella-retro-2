import { Group } from './group';

export class Message {
  id: number;
  text: string;
  group: Group[];
  sessionId: number;

  constructor(id: number, text: string, group: Group[], sessionId: number) {
    this.id = id;
    this.text = text;
    this.group = group;
    this.sessionId = sessionId;
  }
}
