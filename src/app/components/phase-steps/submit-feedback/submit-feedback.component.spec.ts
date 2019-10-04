import { DebugElement } from '@angular/core'
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { SubmitFeedbackComponent } from './submit-feedback.component'

describe('SubmitFeedbackComponent', () => {
  let component: SubmitFeedbackComponent
  let fixture: ComponentFixture<SubmitFeedbackComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitFeedbackComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitFeedbackComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
