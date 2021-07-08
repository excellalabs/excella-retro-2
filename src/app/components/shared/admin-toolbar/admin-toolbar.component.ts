import { Component, Input, OnInit } from '@angular/core'
import { AngularFire, FirebaseObjectObservable } from '@angular/fire'
import { MatDialog, MatSnackBar } from '@angular/material'
import { LocalStorageService } from 'angular-2-local-storage'

import { Phase } from '../../../models/phase'
import { Retro } from '../../../models/retro'
import { EndRetroComponent } from '../end-retro/end-retro.component'

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css'],
})
export class AdminToolbarComponent implements OnInit {
  @Input() retroObservable: FirebaseObjectObservable<Retro>
  currentPhaseObservable: FirebaseObjectObservable<Phase>
  retroVal: Retro
  endPhaseStepButtonTooltipText: string
  readonly phaseStepCount = 4

  constructor(
    public snackbar: MatSnackBar,
    public dialog: MatDialog,
    private af: AngularFire,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const self = this

    this.retroObservable.subscribe(retroVal => {
      self.retroVal = retroVal
      self.currentPhaseObservable = this.af.database.object(
        'phases/' + retroVal.currentPhaseId
      )
      const phaseSubscription = self.currentPhaseObservable.subscribe(phaseVal => {
        this.setCurrentPhaseStepButtonText(phaseVal.currentPhaseStep)
      })
    })
  }

  setCurrentPhaseStepButtonText(currentPhaseStep: number) {
    if (currentPhaseStep === 1) {
      this.endPhaseStepButtonTooltipText = 'Finish "Submit Feedback" Step'
    } else if (currentPhaseStep === 2) {
      this.endPhaseStepButtonTooltipText = 'Finish "Group Feedback" Step'
    } else if (currentPhaseStep === 3) {
      this.endPhaseStepButtonTooltipText = 'Finish "Vote on Feedback" Step'
    } else if (currentPhaseStep === 4) {
      this.endPhaseStepButtonTooltipText = 'Finish "Phase Summary" Step'
    }
  }

  copyTextSuccessful() {
    this.snackbar.open('Text copied to clipboard!', 'OK', {
      duration: 1000,
    })
  }

  endStep() {
    const self = this

    // TODO: Add modal to confirm End Phase

    const phasesObservable = self.af.database.list('phases/', {
      query: {
        orderByChild: 'retroId',
        equalTo: self.retroVal.$key,
      },
    })

    const phasesSubscription = phasesObservable.subscribe(phasesVal => {
      const phaseCount = phasesVal.length

      self.currentPhaseObservable = self.af.database.object(
        'phases/' + self.retroVal.currentPhaseId
      )
      const currentPhaseSubscription = self.currentPhaseObservable.subscribe(
        currentPhaseVal => {
          const currentPhaseStep = currentPhaseVal.currentPhaseStep
          if (currentPhaseStep < self.phaseStepCount) {
            self.goToNextPhaseStep(currentPhaseStep)
          } else {
            const currentPhaseNumber = self.retroVal.currentPhaseNumber
            if (currentPhaseNumber < phaseCount) {
              self.startNextPhase(currentPhaseNumber, phasesVal)
            } else {
              self.endRetro()
            }
          }
          currentPhaseSubscription.unsubscribe()
        }
      )
      phasesSubscription.unsubscribe()
    })
  }

  goToNextPhaseStep(currentPhaseStep) {
    const nextPhaseStep = (currentPhaseStep += 1)
    this.currentPhaseObservable.update({ currentPhaseStep: nextPhaseStep })
  }

  startNextPhase(currentPhaseNumber, phasesVal) {
    const nextPhaseNumber = currentPhaseNumber + 1
    const nextPhaseId = phasesVal.filter(x => x.order === nextPhaseNumber)[0].$key
    this.retroObservable.update({
      currentPhaseNumber: nextPhaseNumber,
      currentPhaseId: nextPhaseId,
    })
    this.currentPhaseObservable.update({ currentPhaseStep: 1 })
  }

  showEndRetroDialog() {
    const dialogRef = this.dialog.open(EndRetroComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Option 1') {
        this.endRetro()
      }
    })
  }

  endRetro() {
    this.retroObservable.update({ isActive: false })

    localStorage.removeItem('currentUserId')
  }
}
