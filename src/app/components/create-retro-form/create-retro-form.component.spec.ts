import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRetroFormComponent } from './create-retro-form.component';

describe('CreateRetroFormComponent', () => {
  let component: CreateRetroFormComponent;
  let fixture: ComponentFixture<CreateRetroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRetroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRetroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
