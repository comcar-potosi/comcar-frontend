import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { LotModule } from './lot.module';
import { LotService } from './services/lot.service';
import { Lot } from '@core/interfaces/lot.interface';

@Component({
    selector: 'app-lot',
    imports: [LotModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './lot.component.html'
})
export class LotComponent implements OnInit {

  public lotService = inject(LotService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultLotColumnsDefinitions();
  public selectedLot: Lot;
  public lots: Lot[] = [];

  ngOnInit(): void {
    this.getLots();
  }

  public getLots(): void {
    this.lotService.findAll().subscribe({
      next: (res) => {
        this.lots = res;
      }
    })
  }

  public setSelected(lot: Lot) {
    this.lotService.setSelectedRow(lot);
    this.selectedLot = lot;
  }

  public onTableSelfEmision(table: GenericTableComponent<Lot>) {
    this.lotService.eventTableComponent.emit(table);
  }
}
