import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { SupplierService } from './services/supplier.service';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { SupplierModule } from './supplier.module';
import { Supplier } from '@core/interfaces/supplier.interface';

@Component({
    selector: 'app-supplier',
    imports: [SupplierModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './supplier.component.html'
})
export class SupplierComponent implements OnInit {

  public supplierService = inject(SupplierService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultSupplierColumnsDefinitions();
  public selectedSupplier: Supplier;
  public suppliers: Supplier[] = [];

  ngOnInit(): void {
    this.getSuppliers();
  }

  public getSuppliers(): void {
    this.supplierService.findAll().subscribe({
      next: (res) => {
        this.suppliers = res;
      }
    })
  }

  public setSelected(supplier: Supplier) {
    this.supplierService.setSelectedRow(supplier);
    this.selectedSupplier = supplier;
  }

  public onTableSelfEmision(table: GenericTableComponent<Supplier>) {
    this.supplierService.eventTableComponent.emit(table);
  }
}
