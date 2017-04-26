import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-retro-complete',
  templateUrl: './retro-complete.component.html',
  styleUrls: ['./retro-complete.component.css']
})
export class RetroCompleteComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
  }

  showRetroSummary() {
    this.router.navigate(['summary'], { relativeTo: this.route });
  }
}
