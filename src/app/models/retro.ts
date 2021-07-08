export class Retro {
  name: string
  isActive: boolean
  currentPhaseId: string
  currentPhaseNumber: number
  votesPerParticipant: number
  adminId: string
  $key: string

  constructor(
    name: string,
    isActive: boolean,
    currentPhaseId: string,
    currentPhaseNumber: number,
    votesPerParticipant: number,
    adminId: string
  ) {
    this.name = name
    this.isActive = isActive
    this.currentPhaseId = currentPhaseId
    this.currentPhaseNumber = currentPhaseNumber
    this.votesPerParticipant = votesPerParticipant
    this.adminId = adminId
  }
}
