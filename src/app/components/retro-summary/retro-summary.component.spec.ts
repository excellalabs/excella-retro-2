import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { RetroSummaryComponent } from './retro-summary.component'

describe('RetroSummaryComponent', () => {
  let component: RetroSummaryComponent
  let fixture: ComponentFixture<RetroSummaryComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetroSummaryComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
