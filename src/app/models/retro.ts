export class Retro {
  name: string;
  isActive: boolean;
  currentPhaseNumber: number;
  votesPerParticipant: number;
  $key: string;

  constructor(name: string, isActive: boolean, currentPhaseNumber: number, votesPerParticipant: number) {
    this.name = name;
    this.isActive = isActive;
    this.currentPhaseNumber = currentPhaseNumber;
    this.votesPerParticipant = votesPerParticipant;
  }
}
