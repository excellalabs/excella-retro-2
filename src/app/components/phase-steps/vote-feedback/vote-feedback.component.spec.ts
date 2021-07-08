import { DebugElement } from '@angular/core'
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { VoteFeedbackComponent } from './vote-feedback.component'

describe('VoteFeedbackComponent', () => {
  let component: VoteFeedbackComponent
  let fixture: ComponentFixture<VoteFeedbackComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoteFeedbackComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteFeedbackComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
