import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
//ngrxR
import{provideStore} from '@ngrx/store'
import{provideEffects} from '@ngrx/effects'
import{provideStoreDevtools} from '@ngrx/store-devtools'
import { cartReducer } from './store/reducer/cart.reducer';


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
    provideEffects(),
    provideStoreDevtools({
      maxAge:10,
      autoPause:true,
      trace:false,
      traceLimit:70,
      connectInZone:true
    }),
  
  ]
};
