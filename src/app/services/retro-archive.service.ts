import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable , FirebaseListObservable } from 'angularfire2';
import { ArchivedRetro } from '../models/archived-retro';
import { Phase } from '../models/phase';
import { Message } from '../models/message';
import { Group } from '../models/group';

@Injectable()
export class RetroArchiveService {
  archivedRetroObservable: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) { }

  getArchivedRetroById(retroId: string) {
    this.archivedRetroObservable = this.af.database.object('archivedRetros/' + retroId);
    const archivedRetroSubscription = this.archivedRetroObservable.subscribe(archivedRetroVal => {
      if (archivedRetroVal.$exists()) {
        return archivedRetroVal;
      } else {
        archivedRetroSubscription.unsubscribe();
        this.createArchivedRetro(retroId);
        // TODO: Return archived retro
      }
    });
  }

  createArchivedRetro(retroId: string) {
    let archivedRetro: ArchivedRetro;
    const phasesObservable = this.getPhasesObservable(retroId);
  }

  getPhasesObservable(retroId: string): FirebaseListObservable<Phase[]> {
    return this.af.database.list('phases', {
      query: {
        orderByKey: true,
        equalTo: { value: retroId, key: 'retroId' }
      }
    });
  }
}
