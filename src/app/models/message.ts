export class Message {
  id: number;
  text: string;
  groupId: number;
  sessionId: number;

  constructor(id: number, text: string, groupId: number, sessionId: number) {
    this.id = id;
    this.text = text;
    this.groupId = groupId;
    this.sessionId = sessionId;
  }
}
