import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@core/pipes/pipes.module';
import { MessageRequiredFieldComponent } from "../../shared/components/message-required-field/message-required-field.component";
import { InputFileComponent } from '@shared/components/input-file/input-file.component';


@NgModule({
  declarations: [
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    PrimeComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MessageRequiredFieldComponent,
    InputFileComponent
],
  exports: [
    CommonModule,
    PrimeComponentsModule,
    ModalFormComponent,
    FormsModule
  ]
})
export class HolidayModule { }
