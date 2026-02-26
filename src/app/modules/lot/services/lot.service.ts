import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter  } from '@angular/core';
import { environment } from '@core/environments/environment.development';
import { IServiceCommon } from '@core/interfaces/service-common.interface';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { CrudService } from '@core/services/crud.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { Lot } from '@core/interfaces/lot.interface';
import { LOT_ASSIGNMENT_KEY } from '@core/enums/lot.enum';

@Injectable({
  providedIn: 'root'
})
export class LotService extends CrudService<Lot> implements IServiceCommon {

  @Output() eventFormComponent: EventEmitter<ModalFormComponent> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<GenericTableComponent<Lot>> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<ModaldeleteComponent> = new EventEmitter();

  constructor(
    protected override http: HttpClient,
    protected override httpErrorHandlerService: HttpErrorHandlerService) {
    super(http, `${environment.server_url}/lots`, httpErrorHandlerService);
  }

  public getSearch(state: boolean, assignment: LOT_ASSIGNMENT_KEY) {
    const params = new HttpParams()
      .set('state', state)
      .set('assignment', assignment);
    return this.http.get<Lot[]>(`${this.url}/search`, { params });
  }

}
