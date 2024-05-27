import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = Inject(SpinnerService);
  spinnerService.show();
  return next(req).pipe(finalize(() => spinnerService.hide()));
};
