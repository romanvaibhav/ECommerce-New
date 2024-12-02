import { TestBed } from '@angular/core/testing';

import { CutomerService } from './cutomer.service';

describe('CutomerService', () => {
  let service: CutomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
