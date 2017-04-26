import { TestBed, inject } from '@angular/core/testing';

import { RetroArchiveService } from './retro-archive.service';

describe('RetroArchiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetroArchiveService]
    });
  });

  it('should ...', inject([RetroArchiveService], (service: RetroArchiveService) => {
    expect(service).toBeTruthy();
  }));
});
