import { Phase } from './phase';

export class Session {
	id: number;
	isActive: boolean;
	currentStep: number;
	votesPerParticipant: number;
	phases: Phase[];

	constructor(id: number, isActive: boolean, currentStep: number, votesPerParticipant: number, phases: Phase[]) {
		this.id = id;
		this.isActive = isActive;
		this.currentStep = currentStep;
		this.votesPerParticipant = votesPerParticipant;
		this.phases = phases;
	}
}
