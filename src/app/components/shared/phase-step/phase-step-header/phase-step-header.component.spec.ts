import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { PhaseStepHeaderComponent } from './phase-step-header.component'

describe('PhaseStepHeaderComponent', () => {
  let component: PhaseStepHeaderComponent
  let fixture: ComponentFixture<PhaseStepHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhaseStepHeaderComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseStepHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
