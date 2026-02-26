import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '@core/environments/environment.development';
import { IServiceCommon } from '@core/interfaces/service-common.interface';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { CrudService } from '@core/services/crud.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { ResetPassword, User } from '@core/interfaces/user.interface';
import { ModalResetPasswordComponent } from '../components/modal-reset-password/modal-reset-password.component';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class UserService extends CrudService<User> implements IServiceCommon {
   @Output() eventFormComponent: EventEmitter<ModalFormComponent> = new EventEmitter();
   @Output() eventTableComponent: EventEmitter<GenericTableComponent<User>> = new EventEmitter();
   @Output() eventModalDeleteComponent: EventEmitter<ModaldeleteComponent> = new EventEmitter();
   @Output() eventModalResetPassword: EventEmitter<ModalResetPasswordComponent> = new EventEmitter();

   constructor(
      protected override http: HttpClient,
      protected override httpErrorHandlerService: HttpErrorHandlerService,
   ) { super( http, `${environment.server_url}/users`, httpErrorHandlerService) }

   public register(body: User) {
      return this.http.post<User>(`${this.url}/register`, body);
   }
   
   public resetPassword(userId: number, body: ResetPassword): Observable<string> {
      return this.http.patch(`${this.url}/reset-password/${userId}`, body, {responseType: 'text'});
   }

}
