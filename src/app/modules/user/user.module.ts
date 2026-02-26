import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@core/pipes/pipes.module';
import { MessageRequiredFieldComponent } from '../../shared/components/message-required-field/message-required-field.component';
import { ModalResetPasswordComponent } from './components/modal-reset-password/modal-reset-password.component';

@NgModule({
   declarations: [
      ModalFormComponent,
      ModalResetPasswordComponent
   ],
   imports: [
      CommonModule,
      PipesModule,
      PrimeComponentsModule,
      ReactiveFormsModule,
      FormsModule,
      MessageRequiredFieldComponent,
   ],
   exports: [
      CommonModule,
      PrimeComponentsModule,
      ModalFormComponent,
      ModalResetPasswordComponent,
      FormsModule,
   ],
})
export class UserModule {}
