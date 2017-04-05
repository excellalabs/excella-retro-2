export class Phase {
  name: string;
  currentPhaseOrder: number;
  retroId: string;
  order: number;
  $key: string;

  constructor(name: string, currentPhaseOrder: number, retroId: string, order: number) {
    this.name = name;
    this.currentPhaseOrder = currentPhaseOrder;
    this.retroId = retroId;
    this.order = order;
  }
}
