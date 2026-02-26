import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from './prime-components/prime-components.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  imports: [
    CommonModule,
    PrimeComponentsModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class SharedModule { }
