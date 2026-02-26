import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { LOCAL_STORAGE } from '@core/constants/local-storage';
import { LocalStorageService } from '@core/services/local-storage.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private localStorageService = inject(LocalStorageService);
  private httpErrorHandlerService = inject(HttpErrorHandlerService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest = request;
    const token = this.localStorageService.get(LOCAL_STORAGE.TOKEN);
    cloneRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(cloneRequest).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        return this.httpErrorHandlerService.handleAndThrow(error)
      })
    );
  }
}
