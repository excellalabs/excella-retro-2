export class Retro {
  name: string;
  isActive: boolean;
  currentPhase: number;
  votesPerParticipant: number;

  constructor(name: string, isActive: boolean, currentPhase: number, votesPerParticipant: number) {
    this.name = name;
    this.isActive = isActive;
    this.currentPhase = currentPhase;
    this.votesPerParticipant = votesPerParticipant;
  }
}
