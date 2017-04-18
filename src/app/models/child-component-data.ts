import { FirebaseObjectObservable } from 'angularfire2';
import { Retro } from './retro';
import { Phase } from './phase';

export class ChildComponentData {

  constructor(
    public retroObservable: FirebaseObjectObservable<Retro>,
    public currentPhaseObservable: FirebaseObjectObservable<Phase>) { }
}
