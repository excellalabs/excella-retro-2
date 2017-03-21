export class Session {
  id: number;
  name: string;
  isActive: boolean;
  currentStep: number;
  votesPerParticipant: number;

  constructor(id: number, name: string, isActive: boolean, currentStep: number, votesPerParticipant: number) {
    this.id = id;
    this.name = name;
    this.isActive = isActive;
    this.currentStep = currentStep;
    this.votesPerParticipant = votesPerParticipant;
  }
}
