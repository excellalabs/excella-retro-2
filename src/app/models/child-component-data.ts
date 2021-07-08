//TODO: change to observables
import { FirebaseObjectObservable } from '@angular/fire'

import { Phase } from './phase'
import { Retro } from './retro'

export class ChildComponentData {
  constructor(
    public retroObservable: FirebaseObjectObservable<Retro>,
    public currentPhaseObservable: FirebaseObjectObservable<Phase>
  ) {}
}
