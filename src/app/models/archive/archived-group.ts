import { ArchivedMessage } from '../archive/archived-message';

export class ArchivedGroup {

  constructor(
    groupId: string,
    name: string,
    numOfVotes: number,
    archivedMessages: ArchivedMessage[]) {
  }
}
