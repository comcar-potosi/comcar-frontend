import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { HolidayModule } from './company.module';
import { CompanyService } from './services/company.service';
import { Company } from '@core/interfaces/company.interface';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { Table } from 'primeng/table';
import { FormatImagesService } from '@core/services/format-image.service';

@Component({
    selector: 'app-company',
    imports: [HolidayModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './company.component.html',
    providers: [FormatImagesService]
})
export class CompanyComponent implements OnInit {

  @ViewChild('table') table: Table;

  public companyService = inject(CompanyService);
  public formatImagesService = inject(FormatImagesService);

  public readonly labels = LABELS;
  public tableComponent: GenericTableComponent<Company>;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultCompanyColumnsDefinitions();
  public selectedCompany: Company;
  public companies: Company[] = [];

  ngOnInit(): void {
    this.getCompanies();
    this.sendFormatImages();
  }

  public getCompanies(): void {
    this.companyService.findAll().subscribe({
      next: (res) => {
        this.companies = res;
      }
    })
  }

  public setSelected(company: Company) {
    this.companyService.setSelectedRow(company);
    this.selectedCompany = company;
  }

  public onTableSelfEmision(table: GenericTableComponent<Company>) {
    this.tableComponent = table;
    this.companyService.eventTableComponent.emit(table);
  }

  private sendFormatImages() {
    setTimeout(() => {
      this.formatImages();
    }, 350);
  }

  private formatImages() {
    const nativeElement = this.tableComponent.table.el.nativeElement;
    const images: HTMLElement[] = nativeElement.querySelectorAll('img');
    this.formatImagesService.widthImgaesInsideContainer(images, "100%");
  }
}
