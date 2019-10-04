import { Component, OnInit, AfterViewInit, Input, ViewChildren, QueryList, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Retro } from '../../models/retro';
import { Phase } from '../../models/phase';
import { ChildComponentData } from '../../models/child-component-data';
import { JoinRetroFormComponent } from '../join-retro-form/join-retro-form.component';
import { ChildComponent } from '../../models/child-component';
import { SubmitFeedbackComponent } from '../phase-steps/submit-feedback/submit-feedback.component';
import { GroupFeedbackComponent } from '../phase-steps/group-feedback/group-feedback.component';
import { VoteFeedbackComponent } from '../phase-steps/vote-feedback/vote-feedback.component';
import { PhaseSummaryComponent } from '../phase-steps/phase-summary/phase-summary.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { ChildComponentService } from '../../services/child-component.service';
import { ChildComponentDirective } from '../../directives/child-component-directive';
import { WindowService } from '../../services/window.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout/';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.css']
})
export class RetroComponent implements OnInit, AfterViewInit {
  retroId: string;
  retroIsActive: boolean;
  retroObservable: FirebaseObjectObservable<Retro>;
  private subscription: any;
  currentPhaseObservable: FirebaseObjectObservable<Phase>;
  private currentPhaseId: string;
  private currentPhaseStep: number;
  phaseCount: number;
  public user: any;
  public retroSnapshot: Retro;
  public isMobile: boolean = false;
  private activeMediaQuery = '';

  @Input() childComponent: ChildComponent;
  showAdminToolbar: boolean;
  @ViewChildren(ChildComponentDirective) childComponentHostQueryList: QueryList<ChildComponentDirective>;
  childComponentHost: ChildComponentDirective;
  formattedWindowHeight: string;
  loadingScreen = false;
  watcher: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private af: AngularFire,
    private localStorageService: LocalStorageService,
    private childComponentService: ChildComponentService,
    private ngZone: NgZone,
    private windowService: WindowService,
    public media: ObservableMedia
  ) { }

  ngOnInit() {
    const self = this;
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.formattedWindowHeight = this.windowService.setResponsiveWindowHeight(window);

    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.formattedWindowHeight = this.windowService.setResponsiveWindowHeight(window);
      });
    };

    this.af.auth.subscribe(user => {
      if (user) {
        self.user = user;
      } else {
        self.user = null;
      }
    });

    this.subscription = this.route.params.subscribe(params => self.retroId = params['retroId']);
    this.retroObservable = this.af.database.object('retros/' + self.retroId);

    this.showLoadingScreen();
  }

  ngAfterViewInit() {
    const self = this;

    this.retroObservable.subscribe(retroVal => {
      self.hideLoadingScreen();
      self.retroSnapshot = retroVal;
      self.retroIsActive = self.retroSnapshot.isActive;
      self.toggleAdminToolbar();
      self.currentPhaseId = retroVal.currentPhaseId;
      self.currentPhaseObservable = self.af.database.object('phases/' + self.currentPhaseId);
      self.currentPhaseObservable.subscribe(phaseVal => {
        self.currentPhaseStep = phaseVal.currentPhaseStep;
        self.renderPhaseStep();
      });
    });
  }

  renderPhaseStep() {
    const data = new ChildComponentData(this.retroObservable, this.currentPhaseObservable);

    if (this.retroIsActive) {
      if (this.currentPhaseStep === 1) {
        this.childComponent = new ChildComponent(SubmitFeedbackComponent, data);
      } else if (this.currentPhaseStep === 2) {
        this.childComponent = new ChildComponent(GroupFeedbackComponent, data);
      } else if (this.currentPhaseStep === 3) {
        this.childComponent = new ChildComponent(VoteFeedbackComponent, data);
      } else if (this.currentPhaseStep === 4) {
        this.childComponent = new ChildComponent(PhaseSummaryComponent, data);
      }
    } else {
      this.router.navigate(['summary'], { relativeTo: this.route });
      return;
    }

    this.childComponentHost = this.childComponentHostQueryList.first;

    if (this.childComponentHost && this.childComponentHost.viewContainerRef) {
      this.childComponentService.renderChildComponent(this.childComponent, this.childComponentHost);
    } else {
      this.childComponentHostQueryList.changes.subscribe((comps: QueryList<ChildComponentDirective>) => {
        this.childComponentHost = comps.first;
        this.childComponentService.renderChildComponent(this.childComponent, this.childComponentHost);
      });
    }
  }

  validateUser() {
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId == null) {
      this.router.navigate(['/']);
    }
  }

  toggleAdminToolbar() {
    this.showAdminToolbar =
      this.retroSnapshot.isActive
      && this.user
      && this.user.auth.uid === this.retroSnapshot.adminId;
  }

  showLoadingScreen() {
    this.loadingScreen = true;
  }

  hideLoadingScreen() {
    this.loadingScreen = false;
  }

  getCurrentPhaseProgressPercentage(currentPhaseStep: number) {
    return (this.currentPhaseStep / 4 ) * 100
  }
}
