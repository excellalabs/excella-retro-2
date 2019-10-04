import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { PhaseStepCardComponent } from './phase-step-card.component'

describe('PhaseStepCardComponent', () => {
  let component: PhaseStepCardComponent
  let fixture: ComponentFixture<PhaseStepCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhaseStepCardComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseStepCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
