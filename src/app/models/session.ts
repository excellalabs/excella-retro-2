import { Index } from './shared/index';

export class Session {
	id: number;
	isActive: boolean;
	currentStep: number;
	votesPerParticipant: number;
	phases: Index[];

	constructor(id: number, isActive: boolean, currentStep: number, votesPerParticipant: number, phases: Index[]) {
		this.id = id;
		this.isActive = isActive;
		this.currentStep = currentStep;
		this.votesPerParticipant = votesPerParticipant;
		this.phases = phases;
	}
}
