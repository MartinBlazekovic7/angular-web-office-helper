import { TestBed } from '@angular/core/testing';

import { TEntryService } from './t-entry.service';

describe('TEntryService', () => {
  let service: TEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
