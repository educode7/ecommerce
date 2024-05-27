import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { spinnerInterceptor } from './core/interceptors/spinner/spinner.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error/http-error.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({ timeOut: 900, preventDuplicates: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([httpErrorInterceptor, spinnerInterceptor])
    ),
  ],
};
