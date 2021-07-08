import { TestBed, inject } from '@angular/core/testing'

import { ChildComponentService } from './child-component.service'

describe('ChildComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildComponentService],
    })
  })

  it('should ...', inject([ChildComponentService], (service: ChildComponentService) => {
    expect(service).toBeTruthy()
  }))
})
