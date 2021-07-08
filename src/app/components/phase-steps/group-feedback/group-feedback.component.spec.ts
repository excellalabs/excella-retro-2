import { DebugElement } from '@angular/core'
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { GroupFeedbackComponent } from './group-feedback.component'

describe('GroupFeedbackComponent', () => {
  let component: GroupFeedbackComponent
  let fixture: ComponentFixture<GroupFeedbackComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupFeedbackComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFeedbackComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
