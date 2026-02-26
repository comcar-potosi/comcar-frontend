import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { MineModule } from './mine.module';
import { MineService } from './services/mine.service';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { Mine } from '@core/interfaces/mine.interface';

@Component({
    selector: 'app-mine',
    imports: [MineModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './mine.component.html'
})
export class MineComponent implements OnInit {

  public mineService = inject(MineService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultMineColumnsDefinitions();
  public selectedMine: Mine;
  public mines: Mine[] = [];

  ngOnInit(): void {
    this.getMines();
  }

  public getMines(): void {
    this.mineService.findAll().subscribe({
      next: (res) => {
        this.mines = res;
      }
    })
  }

  public setSelected(mine: Mine) {
    this.mineService.setSelectedRow(mine);
    this.selectedMine = mine;
  }

  public onTableSelfEmision(table: GenericTableComponent<Mine>) {
    this.mineService.eventTableComponent.emit(table);
  }
}
