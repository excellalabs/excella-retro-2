import { ArchivedMessage } from '../archive/archived-message';
import { ArchivedGroup } from '../archive/archived-group';

export class ArchivedPhase {
  phaseId: string;
  name: string;
  phaseOrder: number;
  archivedMessages: ArchivedMessage[];
  archivedGroups: ArchivedGroup[];

  constructor() {
  }
}
