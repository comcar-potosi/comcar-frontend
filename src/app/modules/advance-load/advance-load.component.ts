import { Component, inject, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { AdvanceLoadModule } from './advance-load.module';
import { AdvanceLoadService } from './services/advance-load.service';
import { AdvanceLoad } from '@core/interfaces/advance-load.interface';

@Component({
    selector: 'app-advance-load',
    imports: [AdvanceLoadModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './advance-load.component.html'
})
export class AdvanceLoadComponent implements OnChanges {

  @Input({required: true}) loadId: number;
  @Input() showToolbar: boolean = true;

  public advanceLoadService = inject(AdvanceLoadService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultAdvanceLoadColumnsDefinitions();
  public selectedAdvanceLoad: AdvanceLoad;
  public advances: AdvanceLoad[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loadId']) {
      this.getAdvancesByLoad();
    }
  }

  public getAdvancesByLoad(): void {
    this.advanceLoadService.getAdvanceByLoad(this.loadId).subscribe({
      next: (res) => {
        this.advances = res;
      }
    })
  }

  public setSelected(advanceLoad: AdvanceLoad) {
    this.advanceLoadService.setSelectedRow(advanceLoad);
    this.selectedAdvanceLoad = advanceLoad;
  }

  public onTableSelfEmision(table: GenericTableComponent<AdvanceLoad>) {
    this.advanceLoadService.eventTableComponent.emit(table);
  }
}
