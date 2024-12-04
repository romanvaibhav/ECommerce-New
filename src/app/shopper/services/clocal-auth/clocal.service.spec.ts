import { TestBed } from '@angular/core/testing';

import { ClocalService } from './clocal.service';

describe('ClocalService', () => {
  let service: ClocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
