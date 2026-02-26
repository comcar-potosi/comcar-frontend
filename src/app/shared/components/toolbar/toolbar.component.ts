import { Component, Input, inject } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ModaldeleteComponent } from '../modal-delete/modal-delete.component';
import { IdBaseInterface } from '@core/interfaces/base-common.interface';

@Component({
    selector: 'app-toolbar-common',
    imports: [RouterModule, FormsModule, PrimeComponentsModule],
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent<T extends IdBaseInterface> {

  @Input() serviceGeneric: any = null;
  @Input() object: T = null;
  @Input() showToolbar: boolean = true;
  @Input() showCreate: boolean = true;
  @Input() showEdit: boolean = true;
  @Input() showDelete: boolean = true;
  @Input() tooltipCreate: string = 'Crear';
  @Input() tooltipEdit: string = 'Editar';
  @Input() tooltipDelete: string = 'Eliminar';
  @Input() iconCreate: string = 'pi-plus';
  @Input() iconEdit: string = 'pi-pencil';
  @Input() iconDelete: string = 'pi-trash';

  formComponent: any;
  modalDeleteComponent: any;

  private helpersService = inject(HelpersService);

  ngOnInit() {
    if ( this.serviceGeneric ) {

      this.serviceGeneric.eventFormComponent.subscribe((formComponent: any) => {
        this.formComponent = formComponent;
      });

      this.serviceGeneric.eventModalDeleteComponent.subscribe((modalDeleteComponent: ModaldeleteComponent) => {
        this.modalDeleteComponent = modalDeleteComponent;
      });
    }
  }

  create() {
    this.formComponent.openCreate();
  }

  edit() {
    if ( this.object?.id ) {
      this.formComponent.openEdit(this.object.id);
    } else {
      this.helpersService.messageNotification("warn", "Por favor", `Seleccione una Fila`, 3000);
    }
  }

  deleteRow() {
    if ( this.object?.id ) {
      this.modalDeleteComponent.openConfirm();
    } else {
      this.helpersService.messageNotification("warn", "Por favor", `Seleccione una Fila`, 3000);
    }
  }
}
