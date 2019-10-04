import { ComponentFactoryResolver, Injectable, ViewChild } from '@angular/core'

import { ChildComponentDirective } from '../directives/child-component-directive'
import { ChildComponent } from '../models/child-component'

@Injectable()
export class ChildComponentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  renderChildComponent(
    childComponent: ChildComponent,
    childComponentHost: ChildComponentDirective
  ): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      childComponent.component
    )
    const viewContainerRef = childComponentHost.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent(componentFactory)
    ;(<ChildComponent>componentRef.instance).data = childComponent.data
  }
}
