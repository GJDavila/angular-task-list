import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TaskEffects } from './state/task.effects';
import { UserEffects } from './state/user.effects';
import { reducers } from './state/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),

    provideStore(reducers, {}),
    provideEffects([TaskEffects, UserEffects]),
    provideHttpClient(),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
