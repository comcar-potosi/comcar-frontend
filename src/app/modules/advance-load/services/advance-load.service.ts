import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter  } from '@angular/core';
import { environment } from '@core/environments/environment.development';
import { IServiceCommon } from '@core/interfaces/service-common.interface';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { CrudService } from '@core/services/crud.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { AdvanceLoad, TotalAdvance } from '@core/interfaces/advance-load.interface';

@Injectable({
  providedIn: 'root'
})
export class AdvanceLoadService extends CrudService<AdvanceLoad> implements IServiceCommon {

  @Output() eventFormComponent: EventEmitter<ModalFormComponent> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<GenericTableComponent<AdvanceLoad>> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<ModaldeleteComponent> = new EventEmitter();

  constructor(
    protected override http: HttpClient,
    protected override httpErrorHandlerService: HttpErrorHandlerService) {
    super(http, `${environment.server_url}/advances`, httpErrorHandlerService);
  }

  public getAdvanceByLoad(loadId: number) {
    return this.http.get<AdvanceLoad[]>(`${this.url}/load/${loadId}`);
  }
  
  public getTotalAdvance(loadId: number) {
    return this.http.get<TotalAdvance>(`${this.url}/total/${loadId}`);
  }

}
