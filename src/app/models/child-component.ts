import { Type } from '@angular/core'

export class ChildComponent {
  constructor(public component: Type<any>, public data: any) {}
}
