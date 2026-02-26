import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter  } from '@angular/core';
import { environment } from '@core/environments/environment.development';
import { IServiceCommon } from '@core/interfaces/service-common.interface';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { CrudService } from '@core/services/crud.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { CorrelativeLot, Load } from '@core/interfaces/load.interface';
import { LOAD_STATUS_KEY } from '@core/enums/load.enum';

@Injectable({
  providedIn: 'root'
})
export class LoadService extends CrudService<Load> implements IServiceCommon {

  @Output() eventFormComponent: EventEmitter<ModalFormComponent> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<GenericTableComponent<Load>> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<ModaldeleteComponent> = new EventEmitter();

  constructor(
    protected override http: HttpClient,
    protected override httpErrorHandlerService: HttpErrorHandlerService) {
    super(http, `${environment.server_url}/loads`, httpErrorHandlerService);
  }

  public getCorrelativeLot(lotId: number) {
    return this.http.get<CorrelativeLot>(`${this.url}/correlative/preview/${lotId}`);
  }
  
  public getSearch(state: LOAD_STATUS_KEY) {
    const params: HttpParams = new HttpParams().set('state', state);
    return this.http.get<Load[]>(`${this.url}/search`, {params});
  }

}
