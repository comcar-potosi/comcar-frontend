import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { UserService } from '../../services/user.service';
import { User } from '@core/interfaces/user.interface';
import { ROLES_VALUE_SYSTEM } from '@core/enums/roles.enum';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private helpersService = inject(HelpersService);
   private userService = inject(UserService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public readonly roles = ROLES_VALUE_SYSTEM;
   public selectedUser: User;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public formUser: FormGroup = FormUtils.getDefaultUserFormGroup();
   public isEdit = signal<boolean>(false);
   private tableComponent: GenericTableComponent<User>;

   ngOnInit() {
      this.registerTableComponentListener();
      this.waitForDataSelection();
      this.userService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.formUser.get('password').addValidators(Validators.required);
      this.reset();
      this.formUser.patchValue({
         state: true
      })
      this.tittleForm = 'Crear usuario';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.formUser.get('password').removeValidators(Validators.required);
      this.reset();
      this.tittleForm = 'Editar usuario';
      this.userService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.openModal = true;
            this.updateFormValues(res);
         },
      });
   }

   private updateFormValues(user: User) {
      this.formUser.patchValue({
         ...user,
      });
   }

   public saveUser() {
      if (this.formUser.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formUser.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: User = {
         ...this.formUser.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.userService.register(data)
            : this.userService.update(this.selectedUser.id, data);
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
      this.userService.eventTableComponent.subscribe((tableComponent) => {
         this.tableComponent = tableComponent;
      });
   }

   private waitForDataSelection() {
      this.userService
         .getSelectedRow()
         .subscribe((User) => (this.selectedUser = User));
   }
}
