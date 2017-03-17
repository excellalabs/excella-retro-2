export class Phase {
  id: number;
  name: string;
  sessionId: string;

  constructor(id: number, name: string, sessionId: string) {
    this.id = id;
    this.name = name;
    this.sessionId = sessionId;
  }
}
