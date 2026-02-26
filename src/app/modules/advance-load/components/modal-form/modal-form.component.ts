import { Component, inject, Input, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { AdvanceLoadService } from '../../services/advance-load.service';
import { AdvanceLoad } from '@core/interfaces/advance-load.interface';
import {
   PaymentChanelDropdownOptions,
   PaymentChanelEnum,
   PaymentTypeEnum
} from '@core/enums/advance-load.enum';
import { LotService } from 'src/app/modules/lot/services/lot.service';
import { LOT_ASSIGNMENT_KEY } from '@core/enums/lot.enum';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   @Input({ required: true }) loadId: number;

   private helpersService = inject(HelpersService);
   private advanceLoadService = inject(AdvanceLoadService);
   private lotService = inject(LotService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public readonly paymentTypes = PaymentTypeEnum;
   public readonly paymentChannels = PaymentChanelDropdownOptions;
   public selectedAdvanceLoad: AdvanceLoad;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public formAdvanceLoad: FormGroup = FormUtils.getDefaultAdvanceLoadFormGroup();
   private tableComponent: GenericTableComponent<AdvanceLoad>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.waitForDataSelection();
      this.advanceLoadService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.getCorrelativeLot();
      this.formAdvanceLoad.patchValue({
         loadId: this.loadId,
         date: new Date(),
         paymentType: PaymentTypeEnum.CASH,
         paymentChanel: PaymentChanelEnum.CASHIER,
      });
      this.tittleForm = 'Crear anticipo';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar anticipo';
      this.advanceLoadService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.openModal = true;
            this.updateFormValues(res);
         },
      });
   }

   private updateFormValues(AdvanceLoad: AdvanceLoad) {
      this.formAdvanceLoad.patchValue({
         ...AdvanceLoad,
      });
   }

   public saveAdvanceLoad() {
      if (this.formAdvanceLoad.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formAdvanceLoad.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: AdvanceLoad = {
         ...this.formAdvanceLoad.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.advanceLoadService.create(data)
            : this.advanceLoadService.update(this.selectedAdvanceLoad.id, data);
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
      this.advanceLoadService.eventTableComponent.subscribe(
         (tableComponent) => {
            this.tableComponent = tableComponent;
         },
      );
   }

   private waitForDataSelection() {
      this.advanceLoadService
         .getSelectedRow()
         .subscribe((AdvanceLoad) => (this.selectedAdvanceLoad = AdvanceLoad));
   }

   private getCorrelativeLot() {
      this.lotService.getSearch(true, LOT_ASSIGNMENT_KEY.RECEIPT).subscribe({
         next: (resp) => {
            this.formAdvanceLoad.patchValue({
               receiptCode: resp[0].correlative
            })
         }
      })
   }

   public onchangedPaymentType() {
      if (this.formAdvanceLoad.value.paymentType === PaymentTypeEnum.CHECK) {
         this.formAdvanceLoad
            .get('checkNumber')
            .addValidators(Validators.required);
      } else {
         this.formAdvanceLoad
            .get('checkNumber')
            .removeValidators(Validators.required);
      }
      this.formAdvanceLoad.get('checkNumber').reset();
   }
}
