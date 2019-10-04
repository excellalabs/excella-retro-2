import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[appChildComponent]',
})
export class ChildComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
