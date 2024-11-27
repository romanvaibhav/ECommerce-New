import { TestBed } from '@angular/core/testing';

import { RecaptchaService } from './re-captcha.service';

describe('ReCaptchaService', () => {
  let service: RecaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
