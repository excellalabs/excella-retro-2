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

  constructor(private af: AngularFire,
    private route: ActivatedRoute,
    private retroArchiveService: RetroArchiveService) { }

  ngOnInit() {
    const self = this;

    this.route.params.subscribe(params => self.retroId = params['retroId']);

    this.af.database.list('/archivedRetros', {
      query: {
        orderByChild: 'retroId',
        equalTo: this.retroId
      }
    }).subscribe(archivedRetroVal => {
      self.archivedRetro = this.retroArchiveService.getArchivedRetroById(archivedRetroVal, this.retroId);
    });
  }
}
