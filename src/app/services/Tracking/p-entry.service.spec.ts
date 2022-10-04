import { TestBed } from '@angular/core/testing';

import { PEntryService } from './p-entry.service';

describe('PEntryService', () => {
  let service: PEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
