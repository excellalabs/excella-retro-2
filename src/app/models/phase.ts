export class Phase {
  name: string;
  currentStep: number;
  retroId: string;

  constructor(name: string, currentStep: number, retroId: string) {
    this.name = name;
    this.currentStep = currentStep;
    this.retroId = retroId;
  }
}
