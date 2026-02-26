import { Component, inject, OnInit, signal } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { LoadModule } from './load.module';
import { LoadService } from './services/load.service';
import { Load } from '@core/interfaces/load.interface';
import { AdvanceLoadComponent } from '../advance-load/advance-load.component';
import { LOAD_STATUS_VALUE } from '@core/enums/load.enum';

@Component({
    selector: 'app-load',
    imports: [LoadModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent, AdvanceLoadComponent],
    templateUrl: './load.component.html'
})
export class LoadComponent implements OnInit {

  public loadService = inject(LoadService);

  public readonly labels = LABELS;
  public readonly LOAD_STATUS_VALUE = LOAD_STATUS_VALUE;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultLoadColumnsDefinitions();
  public selectedLoad: Load;
  public loads: Load[] = [];
  public canEditAndDelete = signal<boolean>(true);

  ngOnInit(): void {
    this.getLoads();
  }

  public getLoads(): void {
    this.loadService.findAll().subscribe({
      next: (res) => {
        this.loads = res;
      }
    })
  }

  public setSelected(load: Load) {
    this.loadService.setSelectedRow(load);
    this.selectedLoad = load;
    this.canEditAndDelete.set(load?.state == LOAD_STATUS_VALUE.PENDING);
  }

  public onTableSelfEmision(table: GenericTableComponent<Load>) {
    this.loadService.eventTableComponent.emit(table);
  }
}
