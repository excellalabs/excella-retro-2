export class Retro {
  name: string;
  isActive: boolean;
  currentStep: number;
  votesPerParticipant: number;

  constructor(name: string, isActive: boolean, currentStep: number, votesPerParticipant: number) {
    this.name = name;
    this.isActive = isActive;
    this.currentStep = currentStep;
    this.votesPerParticipant = votesPerParticipant;
  }
}
