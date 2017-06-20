export class Phase {
  name: string;
  currentPhaseStep: number;
  currentPhaseOrder: number;
  retroId: string;
  order: number;
  $key: string;

  constructor(name: string, currentPhaseStep: number, currentPhaseOrder: number, retroId: string, order: number) {
    this.name = name;
    this.currentPhaseStep = currentPhaseStep;
    this.currentPhaseOrder = currentPhaseOrder;
    this.retroId = retroId;
    this.order = order;
  }
}
