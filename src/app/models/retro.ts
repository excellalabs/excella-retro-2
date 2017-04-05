export class Retro {
  name: string;
  isActive: boolean;
  currentPhaseId: string;
  votesPerParticipant: number;
  $key: string;

  constructor(name: string, isActive: boolean, currentPhaseId: string, votesPerParticipant: number) {
    this.name = name;
    this.isActive = isActive;
    this.currentPhaseId = currentPhaseId;
    this.votesPerParticipant = votesPerParticipant;
  }
}
