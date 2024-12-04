import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cauthGuard } from './cauth.guard';

describe('cauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
