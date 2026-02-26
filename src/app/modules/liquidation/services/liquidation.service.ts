import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter  } from '@angular/core';
import { environment } from '@core/environments/environment.development';
import { IServiceCommon } from '@core/interfaces/service-common.interface';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { CrudService } from '@core/services/crud.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { Liquidation } from '@core/interfaces/liquidation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService extends CrudService<Liquidation> implements IServiceCommon {

  @Output() eventFormComponent: EventEmitter<ModalFormComponent> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<GenericTableComponent<Liquidation>> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<ModaldeleteComponent> = new EventEmitter();

  constructor(
    protected override http: HttpClient,
    protected override httpErrorHandlerService: HttpErrorHandlerService) {
    super(http, `${environment.server_url}/liquidations`, httpErrorHandlerService);
  }

  public getReport(liquidationId: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.url}/report/${liquidationId}`, { responseType: 'arraybuffer'});
  }

}
