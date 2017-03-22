import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Retro } from '../../models/retro';
import { Phase } from '../../models/phase';
import { ChildComponent } from '../../models/child-component';
import { ChildComponentDirective } from '../../directives/child-component-directive';
import { SubmitFeedbackComponent } from '../submit-feedback/submit-feedback.component';

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
  private currentPhase: number;
  private currentPhaseStep: number;
  @Input() childComponent: ChildComponent;
  @ViewChild(ChildComponentDirective) childComponentHost: ChildComponentDirective;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private af: AngularFire,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    let self = this;

    this.subscription = this.route.params.subscribe(params => self.retroId = params['retroId']);
    this.retro = this.af.database.object('retro/' + self.retroId);
    this.retro.subscribe(val => {
      if (self.currentPhase !== val.currentPhase) {
        self.currentPhase = val.currentPhase;
        this.renderPhaseStep();
      }
    });
  }

  renderPhaseStep() {
    this.childComponent = new ChildComponent(SubmitFeedbackComponent, this.retro);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponent.component);
    let viewContainerRef = this.childComponentHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ChildComponent>componentRef.instance).data = this.childComponent.data;
  }
}
