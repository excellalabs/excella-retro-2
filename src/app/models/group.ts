export class Group {
  name: string;
  phaseId: string;
  retroId: string;
  $key: string;

  constructor(name: string, phaseId: string, retroId: string) {
    this.name = name;
    this.phaseId = phaseId;
    this.retroId = retroId;
  }
}
