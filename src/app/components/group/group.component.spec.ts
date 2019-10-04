import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { GroupComponent } from './group.component'

describe('GroupComponent', () => {
  let component: GroupComponent
  let fixture: ComponentFixture<GroupComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
