export class Message {
  id: number;
  text: string;
  groupId: number;
  sessionId: string;

  constructor(id: number, text: string, groupId: number, sessionId: string) {
    this.id = id;
    this.text = text;
    this.groupId = groupId;
    this.sessionId = sessionId;
  }
}
