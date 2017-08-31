import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseSummaryComponent } from './phase-summary.component';

describe('PhaseSummaryComponent', () => {
  let component: PhaseSummaryComponent;
  let fixture: ComponentFixture<PhaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
