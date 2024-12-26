import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
//ngrxR
import{provideStore} from '@ngrx/store'
import{provideEffects} from '@ngrx/effects'
import{provideStoreDevtools} from '@ngrx/store-devtools'
import { cartReducer } from './store/reducer/cart.reducer';
import { cartEffect } from './store/effect/cart.effect';
//PrimeNG
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(),
//ngrxR
    provideStore({
      cart:cartReducer
    }),
    provideEffects(cartEffect),
    provideStoreDevtools({
      maxAge:10,
      logOnly:!isDevMode(),
      autoPause:true,
      trace:true,
      traceLimit:70,
      connectInZone:true
    }),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  
  ]
};
