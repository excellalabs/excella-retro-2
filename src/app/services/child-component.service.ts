import { Injectable, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ChildComponent } from '../models/child-component';
import { ChildComponentDirective } from '../directives/child-component-directive';

@Injectable()
export class ChildComponentService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  renderChildComponent(childComponent: ChildComponent, childComponentHost: ChildComponentDirective): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(childComponent.component);
    const viewContainerRef = childComponentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ChildComponent>componentRef.instance).data = childComponent.data;
  }

}
