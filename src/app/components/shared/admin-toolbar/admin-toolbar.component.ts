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
  endPhaseStepButtonTooltipText: string;

  constructor(public snackbar: MdSnackBar, private af: AngularFire) { }

  ngOnInit() {
    const self = this;

    this.retroObservable.subscribe(retroVal => {
      self.phaseObservable = this.af.database.object('phases/' + retroVal.currentPhaseId);
      const phaseSubscription = self.phaseObservable.subscribe(phaseVal => {
        this.setCurrentPhaseStepButtonText(phaseVal.currentPhaseStep);
      });
    });
  }

  setCurrentPhaseStepButtonText(currentPhaseStep: number) {
    if (currentPhaseStep === 1) {
      this.endPhaseStepButtonTooltipText = 'Finish "Submit Feedback" Step';
    } else if (currentPhaseStep === 2) {
      this.endPhaseStepButtonTooltipText = 'Finish "Group Feedback" Step';
    } else if (currentPhaseStep === 3) {
      this.endPhaseStepButtonTooltipText = 'Finish "Vote on Feedback" Step';
    }
  }

  copyTextSuccessful() {
    this.snackbar.open('Text copied to clipboard!', 'OK', {
      duration: 1000
    });
  }

  endPhase() {
    const self = this;

    // TODO: Add modal to confirm End Phase

    this.retroObservable.subscribe(retroVal => {
      self.phaseObservable = this.af.database.object('phases/' + retroVal.currentPhaseId);
      const phaseSubscription = self.phaseObservable.subscribe(phaseVal => {
        const nextPhaseStep = phaseVal.currentPhaseStep += 1;
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
