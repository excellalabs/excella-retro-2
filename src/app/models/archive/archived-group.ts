import { ArchivedMessage } from '../archive/archived-message';

export class ArchivedGroup {
  groupId: string;
  name: string;
  numOfVotes: number;
  archivedMessages: ArchivedMessage[];

  constructor() {
  }
}
