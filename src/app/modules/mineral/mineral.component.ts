import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { MineralService } from './services/mineral.service';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { Mineral } from '@core/interfaces/mineral.interface';
import { MineralModule } from './mineral.module';

@Component({
   selector: 'app-mineral',
   imports: [
      MineralModule,
      ToolbarComponent,
      ModaldeleteComponent,
      GenericTableComponent,
   ],
   templateUrl: './mineral.component.html',
})
export class MineralComponent implements OnInit {
   public mineralService = inject(MineralService);

   public readonly labels = LABELS;
   public tableColumnDefinitions =
      TableColumnDefinitions.getDefaultMineralColumnsDefinitions();
   public selectedMineral: Mineral;
   public minerals: Mineral[] = [];

   ngOnInit(): void {
      this.getMinerals();
   }

   public getMinerals(): void {
      this.mineralService.findAll().subscribe({
         next: (res) => {
            this.minerals = res;
         },
      });
   }

   public setSelected(mineral: Mineral) {
      this.mineralService.setSelectedRow(mineral);
      this.selectedMineral = mineral;
   }

   public onTableSelfEmision(table: GenericTableComponent<Mineral>) {
      this.mineralService.eventTableComponent.emit(table);
   }
}
