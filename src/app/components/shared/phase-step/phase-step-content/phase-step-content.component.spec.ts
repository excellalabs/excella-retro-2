import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { PhaseStepContentComponent } from './phase-step-content.component'

describe('PhaseStepContentComponent', () => {
  let component: PhaseStepContentComponent
  let fixture: ComponentFixture<PhaseStepContentComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhaseStepContentComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseStepContentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
