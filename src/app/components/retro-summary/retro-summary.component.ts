import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetroArchiveService } from '../../services/retro-archive.service';

@Component({
  selector: 'app-retro-summary',
  templateUrl: './retro-summary.component.html',
  styleUrls: ['./retro-summary.component.css']
})
export class RetroSummaryComponent implements OnInit {
  retroId: string;

  constructor(private route: ActivatedRoute,
    private retroArchiveService: RetroArchiveService) { }

  ngOnInit() {
    const self = this;
    this.route.params.subscribe(params => self.retroId = params['retroId']);
    this.retroArchiveService.getArchivedRetroById(this.retroId);
  }
}
