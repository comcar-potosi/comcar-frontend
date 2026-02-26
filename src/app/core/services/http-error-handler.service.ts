import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import {
  APIErrorBase,
  CustomValidationError,
  DtoValidationError,
  EntityValidatorMultipleError,
  FormattedHttpError
} from '../interfaces/http-error-handling.interface';
import { LoginService } from './login.service';

/**
 * Service to handle http errors.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private loginService: LoginService
  ) { }
  /**
   * Catches an HttpErrorResponse, formats it, displays it, and throws an error.
   * @param {HttpErrorResponse} httpErrorResponse Http error response.
   * @param displayToast True by default, calls primeng `MessageService` for displaying the error or errors.
   * @returns 
   */
  public handleAndThrow(httpErrorResponse: HttpErrorResponse, toastLife: number = 3000) {
    const formattedError = this.httpErrorFormatter(httpErrorResponse);
    this.displayErrors(formattedError.errors, toastLife);
    if (httpErrorResponse.status === HttpStatusCode.Forbidden || httpErrorResponse.status === HttpStatusCode.Unauthorized) {
      this.loginService.logout();
    }
    return throwError(() => formattedError);
  }

  public httpErrorFormatter(httpErrorResponse: HttpErrorResponse): FormattedHttpError {
    const apiErrorBase: APIErrorBase = httpErrorResponse.error;
    const errors: string[] = [];
    if (httpErrorResponse.status === HttpStatusCode.InternalServerError) {
      return {
        code: httpErrorResponse.status,
        status: httpErrorResponse.statusText,
        errors: ['Error Interno del Servidor'],
        path: apiErrorBase.path ?? '/'
      };
    }

    if (apiErrorBase.message) {
      errors.push(apiErrorBase.message);
    }

    if (apiErrorBase.errors) {
      errors.push(...apiErrorBase.errors.map((error: DtoValidationError) => error.message));
    }

    if (apiErrorBase.errorList) {
      if (this.isCustomValidationErrorArray(apiErrorBase.errorList)) {
        errors.push(this.convertArrayToPlainTextList(apiErrorBase.errorList));
      } else {
        errors.push(...(apiErrorBase.errorList).map((error: EntityValidatorMultipleError) => error.message));
      }
    }

    if (httpErrorResponse.status === 0) {
      return {
        code: httpErrorResponse.status,
        status: httpErrorResponse.statusText,
        errors: ['El servicio no está disponible en este momento.'],
        path: httpErrorResponse.url
      };
    }

    return {
      code: apiErrorBase.code,
      status: apiErrorBase.status,
      path: apiErrorBase.path,
      errors
    };
  }

  public requestWithErrorHandling<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(catchError((error: HttpErrorResponse) => this.handleAndThrow(error)));
  }

  private convertArrayToPlainTextList(details: CustomValidationError[]): string {
    return details.map((error: CustomValidationError) => `• ${error.message}`).join('\n');
  }

  private isCustomValidationErrorArray(obj: any): obj is CustomValidationError[] {
    return Array.isArray(obj) && obj.every(item => {
      return typeof item.field === 'string' && typeof item.message === 'string' && typeof item.code === 'string';
    });
  }

  private displayErrors(errors: string[], toastLife: number) {
    errors.forEach((message: string) =>
      this.messageService.add({ severity: 'error', detail: message, life: toastLife })
    );
  }
}
