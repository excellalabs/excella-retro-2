import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndRetroComponent } from './end-retro.component';

describe('EndRetroComponent', () => {
  let component: EndRetroComponent;
  let fixture: ComponentFixture<EndRetroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndRetroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndRetroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
