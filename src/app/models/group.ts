export class Group {
  id: number;
  name: string;
  phaseId: number;
  sessionId: string;

  constructor(id: number, name: string, phaseId: number, sessionId: string) {
    this.id = id;
    this.name = name;
    this.phaseId = phaseId;
    this.sessionId = sessionId;
  }
}
