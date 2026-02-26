import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';

import { Input } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeComponentsModule } from '../../prime-components/prime-components.module';
import { MESSAGES } from '@core/constants/messages';
import { LABELS } from '@core/constants/labels';
import { ITableComponent } from '@core/interfaces/table-component.interface';
import { IServiceCommon } from '@core/interfaces/service-common.interface';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';

@Component({
    selector: 'app-modal-delete',
    imports: [RouterModule, FormsModule, PrimeComponentsModule],
    templateUrl: './modal-delete.component.html'
})

export class ModaldeleteComponent implements OnInit {
  @Input() serviceGeneric: IServiceCommon;
  @Input() objectId: number;
  @Output() onDeleteSuccess = new EventEmitter();

  private helpersService = inject(HelpersService);
  
  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  private tableComponent: ITableComponent;
  public openModal: boolean = false;

  ngOnInit() {
    if ( this.serviceGeneric ) {
      this.serviceGeneric.eventModalDeleteComponent.emit(this);

      this.serviceGeneric.eventTableComponent.subscribe((tableComponent) => {
        this.tableComponent = tableComponent;
      });
    }
  }

  public openConfirm() {
      this.openModalDelete(true);
  }

  public confirmDelete() {
    this.openModalDelete(false);
    this.serviceGeneric.delete(this.objectId).subscribe({
      next: () => {
        this.tableComponent.reload();
        this.onDeleteSuccess.emit();
        this.helpersService.messageNotification(SEVERITY_ENUM.success, "Correcto", MESSAGES.recordDeleted);
      }
    })
  }

  private openModalDelete(state: boolean) {
    this.openModal = state;
  }
}
