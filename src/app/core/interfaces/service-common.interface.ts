import { EventEmitter } from "@angular/core";
import { ModaldeleteComponent } from "@shared/components/modal-delete/modal-delete.component";
import { Observable } from "rxjs";

export interface IServiceCommon {
    eventFormComponent: EventEmitter<any>;
    eventTableComponent: EventEmitter<any>;
    eventModalDeleteComponent: EventEmitter<ModaldeleteComponent>;
    delete(id: number): Observable<void>;
}