import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { UserService } from '../../services/user.service';
import { ResetPassword, User } from '@core/interfaces/user.interface';
import { ROLES_VALUE_SYSTEM } from '@core/enums/roles.enum';

@Component({
   selector: 'app-modal-reset-password',
   templateUrl: './modal-reset-password.component.html',
   standalone: false,
})
export class ModalResetPasswordComponent {
   private helpersService = inject(HelpersService);
   private userService = inject(UserService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public readonly roles = ROLES_VALUE_SYSTEM;
   public selectedUser: User;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public formResetPassword: FormGroup = FormUtils.getDefaultResetPasswordFormGroup();

   ngOnInit() {
      this.waitForDataSelection();
      this.userService.eventModalResetPassword.subscribe(() => {
         this.openModalReset();
      });
   }

   public hideModal() {
      this.openModal = false;
   }

   private openModalReset() {
      this.reset();
      this.tittleForm = 'Cambiar contraseña';
      this.openModal = true;
   }

   private reset(): void {
      this.formResetPassword.reset();
   }

   public submit() {
      if (this.formResetPassword.value.newPassword === this.formResetPassword.value.confirmationPassword) {
         const body: ResetPassword = {
            ...this.formResetPassword.value
         };
         this.userService.resetPassword(this.selectedUser.id, body).subscribe({
            next: () => {
               this.helpersService.messageNotification(
                  SEVERITY_ENUM.success,
                  'Correcto',
                  MESSAGES.passwordUpdated,
               );
               this.hideModal();
               this.reset();
            }
         });
      } else {
         this.helpersService.messageNotification(
                  SEVERITY_ENUM.warn,
                  'Advertencia',
                  MESSAGES.passwordsMustEquals,
               );
      }
   }

   private waitForDataSelection() {
      this.userService
         .getSelectedRow()
         .subscribe((User) => (this.selectedUser = User));
   }
}
