export class Phase {
  name: string;
  currentPhaseStep: number;
  retroId: string;
  $key: string;

  constructor(name: string, currentPhaseStep: number, retroId: string) {
    this.name = name;
    this.currentPhaseStep = currentPhaseStep;
    this.retroId = retroId;
  }
}
