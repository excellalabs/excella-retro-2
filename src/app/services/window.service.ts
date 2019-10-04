import { Injectable } from '@angular/core'

@Injectable()
export class WindowService {
  constructor() {}

  public setResponsiveWindowHeight(windowRef: Window) {
    const windowHeight = windowRef.innerHeight
    const divHeight = windowHeight - 64

    return divHeight + 'px'
  }
}
