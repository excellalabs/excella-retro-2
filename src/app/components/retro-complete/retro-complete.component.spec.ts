import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroCompleteComponent } from './retro-complete.component';

describe('RetroCompleteComponent', () => {
  let component: RetroCompleteComponent;
  let fixture: ComponentFixture<RetroCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
