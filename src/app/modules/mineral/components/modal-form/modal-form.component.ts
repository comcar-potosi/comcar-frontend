import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { MineralService } from '../../services/mineral.service';
import { Mineral } from '@core/interfaces/mineral.interface';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private helpersService = inject(HelpersService);
   private mineralService = inject(MineralService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public selectedMineral: Mineral;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public formMineral: FormGroup = FormUtils.getDefaultMineralFormGroup();
   private tableComponent: GenericTableComponent<Mineral>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.waitForDataSelection();
      this.mineralService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.tittleForm = 'Crear mineral';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar mineral';
      this.mineralService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.openModal = true;
            this.updateFormValues(res);
         },
      });
   }

   private updateFormValues(Mineral: Mineral) {
      this.formMineral.patchValue({
         ...Mineral,
      });
   }

   public saveMineral() {
      if (this.formMineral.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formMineral.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: Mineral = {
         ...this.formMineral.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.mineralService.create(data)
            : this.mineralService.update(this.selectedMineral.id, data);
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
      this.mineralService.eventTableComponent.subscribe((tableComponent) => {
         this.tableComponent = tableComponent;
      });
   }

   private waitForDataSelection() {
      this.mineralService
         .getSelectedRow()
         .subscribe((Mineral) => (this.selectedMineral = Mineral));
   }
}
