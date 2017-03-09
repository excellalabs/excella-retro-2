import { Index } from './shared/index';

export class Message {
  id: number;
  text: string;
  group: Index;
  session: Index;

  constructor(id: number, text: string, group: Index, session: Index) {
    this.id = id;
    this.text = text;
    this.group = group;
    this.session = session;
  }
}
