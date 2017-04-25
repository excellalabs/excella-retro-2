import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-retro-complete',
  templateUrl: './retro-complete.component.html',
  styleUrls: ['./retro-complete.component.css']
})
export class RetroCompleteComponent implements OnInit {
  retroId: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const self = this;
    this.route.params.subscribe(params => self.retroId = params['retroId']);
  }

  showRetroSummary() {
    this.router.navigateByUrl('retro/${self.retroId}/summary');
  }
}
