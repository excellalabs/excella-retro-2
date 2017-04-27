import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetroArchiveService } from '../../services/retro-archive.service';
import { ArchivedRetro } from '../../models/archive/archived-retro';
import { ArchivedGroup } from '../../models/archive/archived-group';
import { ArchivedMessage } from '../../models/archive/archived-message';
import { ArchivedPhase } from '../../models/archive/archived-phase';


@Component({
  selector: 'app-retro-summary',
  templateUrl: './retro-summary.component.html',
  styleUrls: ['./retro-summary.component.css']
})
export class RetroSummaryComponent implements OnInit {
  retroId: string;
  archivedRetro: ArchivedRetro;
  constructor(private route: ActivatedRoute,
    private retroArchiveService: RetroArchiveService) { }

  ngOnInit() {
    const self = this;
    var ar = new ArchivedRetro;
    ar.retroId = "RETRO ID";
    var archivedMessage = new ArchivedMessage;
    archivedMessage.text = "TEXT";
    var archivedGroup = new ArchivedGroup;
    archivedGroup.name = "GROUP NAME";
    archivedGroup.archivedMessages = [archivedMessage, archivedMessage];
    archivedGroup.numOfVotes = 3;
    var archivedPhase = new ArchivedPhase;
    archivedPhase.name = "PHASE NAME";
    archivedPhase.archivedGroups = [archivedGroup, archivedGroup];
    ar.archivedPhases = [archivedPhase, archivedPhase];
    self.archivedRetro = ar;
    this.route.params.subscribe(params => self.retroId = params['retroId']);
    this.retroArchiveService.getArchivedRetroById(this.retroId);
  }
}
