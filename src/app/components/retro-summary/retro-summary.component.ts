import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetroArchiveService } from '../../services/retro-archive.service';
import { ArchivedRetro } from '../../models/archive/archived-retro';
import { ArchivedGroup } from '../../models/archive/archived-group';
import { ArchivedMessage } from '../../models/archive/archived-message';
import { ArchivedPhase } from '../../models/archive/archived-phase';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'app-retro-summary',
  templateUrl: './retro-summary.component.html',
  styleUrls: ['./retro-summary.component.css']
})
export class RetroSummaryComponent implements OnInit {
  retroId: string;
  archivedRetro: ArchivedRetro;
  archivedRetroId: string;

  constructor(private af: AngularFire,
    private route: ActivatedRoute,
    private retroArchiveService: RetroArchiveService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.retroId = params['retroId']);

    this.af.database.list('archivedRetros', {
      query: {
        orderByChild: 'retroId',
        equalTo: this.retroId
      }
    }).first().subscribe(archivedRetroVal => {
      this.archivedRetro = this.retroArchiveService.getArchivedRetroById(archivedRetroVal, this.retroId);
      this.archivedRetroId = this.archivedRetro[0].retroId;
    });
  }
}
