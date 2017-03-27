import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { MdSnackBar } from '@angular/material';
import { Retro } from '../../../models/retro';
import { Phase } from '../../../models/phase';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminToolbarComponent implements OnInit {
  @Input() retroObservable: FirebaseObjectObservable<Retro>;
  phaseObservable: FirebaseObjectObservable<Phase>;

  constructor(public snackbar: MdSnackBar, private af: AngularFire) { }

  ngOnInit() {
  }

  copyTextSuccessful() {
    this.snackbar.open('Text copied to clipboard!', 'OK', {
      duration: 1000
    })
  }

  endPhase() {
    const self = this;

    // TODO: Add modal to confirm End Phase

    this.retroObservable.subscribe(retroVal => {
      self.phaseObservable = this.af.database.object('phases/' + retroVal.currentPhaseId);
      let phaseSubscription = self.phaseObservable.subscribe(phaseVal => {
        let nextPhaseStep = phaseVal.currentPhaseStep += 1;
        self.phaseObservable.update({ currentPhaseStep: nextPhaseStep });
        phaseSubscription.unsubscribe();
      });
    });
  }

  endRetro() {
    // TODO: Add modal to confirm End Retro
    this.retroObservable.update({ isActive: false });
  }
}
