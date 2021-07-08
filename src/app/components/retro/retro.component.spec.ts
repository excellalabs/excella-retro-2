import { DebugElement } from '@angular/core'
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { RetroComponent } from './retro.component'

describe('RetroComponent', () => {
  let component: RetroComponent
  let fixture: ComponentFixture<RetroComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetroComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
