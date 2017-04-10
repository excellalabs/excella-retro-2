import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { MdSnackBar } from '@angular/material';
import { Retro } from '../../../models/retro';
import { Phase } from '../../../models/phase';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminToolbarComponent implements OnInit {
  @Input() retroObservable: FirebaseObjectObservable<Retro>;
  currentPhaseObservable: FirebaseObjectObservable<Phase>;
  retroVal: Retro;
  endPhaseStepButtonTooltipText: string;
  readonly phaseStepCount = 3;

  constructor(
    public snackbar: MdSnackBar,
    private af: AngularFire,
    private localStorageService: LocalStorageService
    ) { }

  ngOnInit() {
    const self = this;

    this.retroObservable.subscribe(retroVal => {
      self.retroVal = retroVal;
      self.currentPhaseObservable = this.af.database.object('phases/' + retroVal.currentPhaseId);
      const phaseSubscription = self.currentPhaseObservable.subscribe(phaseVal => {
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

  endStep() {
    const self = this;

    // TODO: Add modal to confirm End Phase

    const phases = self.af.database.list('phases/', {
      query: {
        orderByChild: 'retroId',
        equalTo: self.retroVal.$key
      }
    });

    phases.subscribe(phasesVal => {
      const phaseCount = phasesVal.length;
      self.currentPhaseObservable = self.af.database.object('phases/' + self.retroVal.currentPhaseId);
      const currentPhaseSubscription = self.currentPhaseObservable.subscribe(currentPhaseVal => {
        const currentPhaseStep = currentPhaseVal.currentPhaseStep;
        if (currentPhaseStep < self.phaseStepCount) {
          self.goToNextPhaseStep(currentPhaseStep);
        } else {
          const currentPhaseNumber = self.retroVal.currentPhaseNumber;
          if (currentPhaseNumber < phaseCount) {
            self.startNextPhase(currentPhaseNumber);
          } else {
            self.endRetro();
          }
        }
        currentPhaseSubscription.unsubscribe();
      });
    });
  }

  goToNextPhaseStep(currentPhaseStep) {
    const nextPhaseStep = currentPhaseStep += 1;
    this.currentPhaseObservable.update({ currentPhaseStep: nextPhaseStep });
  }

  startNextPhase(currentPhaseNumber) {
    const nextPhase = currentPhaseNumber + 1;
    this.retroObservable.update({ currentPhaseNumber: nextPhase });
    this.currentPhaseObservable.update({ currentPhaseStep: 1 });
  }

  endRetro() {
    // TODO: Add modal to confirm End Retro

    this.retroObservable.update({ isActive: false });

    localStorage.removeItem('currentUserId');
  }
}
