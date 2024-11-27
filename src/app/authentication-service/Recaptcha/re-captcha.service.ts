import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../../environment/environment';
import { ReCaptcha_Action } from '../../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor(private reCaptchaV3Service: ReCaptchaV3Service) { }

  async executeCaptcha(action: ReCaptcha_Action): Promise<string | undefined> {
    try {
      return await this.reCaptchaV3Service.executeAsPromise(environment.ReCaptcha_Key, action, {
        useGlobalDomain: false
      });

    } catch (err) {
      console.log("Error in  RecaptchaService");
      console.log(err);
    }
    return undefined;
  }
}
