export class Phase {
  name: string;
  currentPhaseStep: number;
  retroId: string;
  order: number;

  constructor(name: string, currentPhaseStep: number, retroId: string, order: number) {
    this.name = name;
    this.currentPhaseStep = currentPhaseStep;
    this.retroId = retroId;
    this.order = order;
  }
}
