import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { CooperativeService } from './services/cooperative.service';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { Cooperative } from '@core/interfaces/cooperative.interface';
import { CooperativeModule } from './cooperative.module';

@Component({
    selector: 'app-cooperative',
    imports: [CooperativeModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './cooperative.component.html'
})
export class CooperativeComponent implements OnInit {

  public cooperativeService = inject(CooperativeService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultCooperativeColumnsDefinitions();
  public selectedCooperative: Cooperative;
  public cooperatives: Cooperative[] = [];

  ngOnInit(): void {
    this.getCooperatives();
  }

  public getCooperatives(): void {
    this.cooperativeService.findAll().subscribe({
      next: (res) => {
        this.cooperatives = res;
      }
    })
  }

  public setSelected(cooperative: Cooperative) {
    this.cooperativeService.setSelectedRow(cooperative);
    this.selectedCooperative = cooperative;
  }

  public onTableSelfEmision(table: GenericTableComponent<Cooperative>) {
    this.cooperativeService.eventTableComponent.emit(table);
  }
}
