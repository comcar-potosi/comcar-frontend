import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { TypeMineralService } from '../../services/type-mineral.service';
import { TypeMineral } from '@core/interfaces/type-mineral.interface';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private helpersService = inject(HelpersService);
   private typeMineralService = inject(TypeMineralService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public selectedTypeMineral: TypeMineral;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public formTypeMineral: FormGroup =
      FormUtils.getDefaultTypeMineralFormGroup();
   private tableComponent: GenericTableComponent<TypeMineral>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.waitForDataSelection();
      this.typeMineralService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.tittleForm = 'Crear tipo de mineral';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar tipo de mineral';
      this.typeMineralService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.openModal = true;
            this.updateFormValues(res);
         },
      });
   }

   private updateFormValues(TypeMineral: TypeMineral) {
      this.formTypeMineral.patchValue({
         ...TypeMineral,
      });
   }

   public saveTypeMineral() {
      if (this.formTypeMineral.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formTypeMineral.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: TypeMineral = {
         ...this.formTypeMineral.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.typeMineralService.create(data)
            : this.typeMineralService.update(this.selectedTypeMineral.id, data);
      service.subscribe({
         next: () => {
            const message =
               type == TypeSubmitEnum.CREATE
                  ? MESSAGES.recordCreated
                  : MESSAGES.recordUpdated;
            this.helpersService.messageNotification(
               SEVERITY_ENUM.success,
               'Correcto',
               message,
            );
            this.hideModal();
            this.reset();
         },
         complete: () => {
            this.tableComponent.reload();
         },
      });
   }

   private registerTableComponentListener() {
      this.typeMineralService.eventTableComponent.subscribe(
         (tableComponent) => {
            this.tableComponent = tableComponent;
         },
      );
   }

   private waitForDataSelection() {
      this.typeMineralService
         .getSelectedRow()
         .subscribe((TypeMineral) => (this.selectedTypeMineral = TypeMineral));
   }
}
