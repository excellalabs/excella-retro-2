import { DebugElement } from '@angular/core'
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { AdminToolbarComponent } from './admin-toolbar.component'

describe('AdminToolbarComponent', () => {
  let component: AdminToolbarComponent
  let fixture: ComponentFixture<AdminToolbarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminToolbarComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminToolbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
