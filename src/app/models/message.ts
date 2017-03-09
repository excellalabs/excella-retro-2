import { Index } from './shared/index';

export class Message {
  id: number;
  text: string;
  groupId: number;
  session: Index;

  constructor(id: number, text: string, groupId: number, session: Index) {
    this.id = id;
    this.text = text;
    this.groupId = groupId;
    this.session = session;
  }
}
