export class Message {
  id: number;
  text: string;
  groupId: number;
  phaseId: number;
  sessionId: string;

  constructor(id: number, text: string, groupId: number, phaseId: number, sessionId: string) {
    this.id = id;
    this.text = text;
    this.groupId = groupId;
    this.phaseId = phaseId;
    this.sessionId = sessionId;
  }
}
