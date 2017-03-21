import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Retro } from '../../models/retro';
import { Phase } from '../../models/phase';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RetroComponent implements OnInit {
  retroId: string;
  retro: FirebaseObjectObservable<Retro>;
  private subscription: any;
  private currentStep: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private af: AngularFire) { }

  ngOnInit() {
    let self = this;

    this.subscription = this.route.params.subscribe(params => self.retroId = params['retroId']);
    this.retro = this.af.database.object('retro/' + self.retroId);
    this.retro.subscribe(val => {
      // if (self.currentStep !== val.currentStep) {
        self.currentStep = val.currentStep;
      // }
      });
    this.getCurrentPhase();
  }

  getCurrentPhase() {
    //this.retro.
  }
}
