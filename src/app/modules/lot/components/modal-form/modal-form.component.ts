import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { LotService } from '../../services/lot.service';
import { Lot } from '@core/interfaces/lot.interface';
import { LOT_ASSIGNMENT_VALUE } from '@core/enums/lot.enum';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private helpersService = inject(HelpersService);
   private lotService = inject(LotService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public readonly lotAssigments = LOT_ASSIGNMENT_VALUE;
   public selectedLot: Lot;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public formLot: FormGroup = FormUtils.getDefaultLLotFormGroup();
   private tableComponent: GenericTableComponent<Lot>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.waitForDataSelection();
      this.lotService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.formLot.patchValue({
         state: true,
      });
      this.tittleForm = 'Crear lote';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar lote';
      this.lotService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.openModal = true;
            this.updateFormValues(res);
         },
      });
   }

   private updateFormValues(lote: Lot) {
      this.formLot.patchValue({
         ...lote,
      });
   }

   public saveLot() {
      if (this.formLot.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formLot.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: Lot = {
         ...this.formLot.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.lotService.create(data)
            : this.lotService.update(this.selectedLot.id, data);
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
      this.lotService.eventTableComponent.subscribe((tableComponent) => {
         this.tableComponent = tableComponent;
      });
   }

   private waitForDataSelection() {
      this.lotService
         .getSelectedRow()
         .subscribe((Lot) => (this.selectedLot = Lot));
   }
}
