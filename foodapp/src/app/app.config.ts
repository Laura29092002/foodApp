import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { recipeFormReducer } from './store/recipe-form.reducer';
import { daysReducer } from './store/planning-store/planning-store.reducer';
import { provideEffects } from '@ngrx/effects';
import { PlanningEffects } from './store/planning-store/planning-store.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ recipeForm: recipeFormReducer , days: daysReducer}),
    provideEffects([PlanningEffects])
]
};
