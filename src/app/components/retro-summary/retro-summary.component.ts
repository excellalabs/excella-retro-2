import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetroArchiveService } from '../../services/retro-archive.service';
import { ArchivedRetro } from '../../models/archive/archived-retro';
import { ArchivedGroup } from '../../models/archive/archived-group';
import { ArchivedMessage } from '../../models/archive/archived-message';
import { ArchivedPhase } from '../../models/archive/archived-phase';
import { AngularFire } from 'angularfire2';
import '../../shared/rxjs-operators';

@Component({
  selector: 'app-retro-summary',
  templateUrl: './retro-summary.component.html',
  styleUrls: ['./retro-summary.component.css']
})
export class RetroSummaryComponent implements OnInit {
  retroId: string;
  archivedRetro: any;
  archivedRetroId: string;
  archivedPhases: ArchivedPhase[];

  constructor(private af: AngularFire,
    private route: ActivatedRoute,
    private retroArchiveService: RetroArchiveService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => this.retroId = params['retroId']);

    if (!this.archivedRetro || this.archivedRetro.length === 0) {
      await this.retroArchiveService.createArchivedRetro(this.retroId)
        .then((newArchivedRetroVal) => {
          const archivedRetroId = newArchivedRetroVal.key;
          this.retroArchiveService.deleteExistingObjects(this.retroId);

          this.getArchivedRetroObservable().subscribe(archivedRetroVal => {
            this.archivedRetro = archivedRetroVal;
            this.archivedRetroId = this.archivedRetro[0].retroId;
            this.archivedPhases = this.archivedRetro[0].archivedPhases;
          });
        });
    } else {
      const archivedRetroObservable: any = this.getArchivedRetroObservable();
      this.archivedRetro = await archivedRetroObservable.first().toPromise();
      this.archivedRetroId = this.archivedRetro[0].retroId;
      this.archivedPhases = this.archivedRetro[0].archivedPhases;
    }
  }

  getArchivedRetroObservable() {
    return this.af.database.list('archivedRetros', {
      query: {
        orderByChild: 'retroId',
        equalTo: this.retroId
      }
    });
  }
}
