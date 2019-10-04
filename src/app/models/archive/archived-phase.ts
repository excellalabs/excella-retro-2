import { ArchivedGroup } from '../archive/archived-group'
import { ArchivedMessage } from '../archive/archived-message'

export class ArchivedPhase {
  phaseId: string
  name: string
  phaseOrder: number
  archivedMessages: ArchivedMessage[]
  archivedGroups: ArchivedGroup[]

  constructor() {}
}
