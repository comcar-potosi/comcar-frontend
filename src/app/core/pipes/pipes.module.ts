import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipePipe } from './filter-pipe.pipe';
import { FormatDatePipe, FormatDateWithHourPipe } from './format-date.pipe';
import { FormatSafeLinkPipe } from './format-safe-link.pipe';
import { FormatCurrentPageReportTemplatePipe } from './format-current-page-report-template.pipe';
import { BooleanColumnFormatPipe } from './boolean-column-format.pipe';
import { FormatFieldAmountPipe } from './format-field-amount.pipe';

@NgModule({
  declarations: [
    FilterPipePipe,
    FormatDatePipe,
    FormatDateWithHourPipe,
    FormatSafeLinkPipe,
    FormatCurrentPageReportTemplatePipe,
    BooleanColumnFormatPipe,
    FormatFieldAmountPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatDatePipe,
    FormatDateWithHourPipe,
    FormatSafeLinkPipe,
    FormatCurrentPageReportTemplatePipe,
    BooleanColumnFormatPipe,
    FormatFieldAmountPipe
  ]
})
export class PipesModule { }
