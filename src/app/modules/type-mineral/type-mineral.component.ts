import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { TypeMineralModule } from './type-mineral.module';
import { TypeMineralService } from './services/type-mineral.service';
import { TypeMineral } from '@core/interfaces/type-mineral.interface';

@Component({
   selector: 'app-type-mineral',
   imports: [
      TypeMineralModule,
      ToolbarComponent,
      ModaldeleteComponent,
      GenericTableComponent,
   ],
   templateUrl: './type-mineral.component.html',
})
export class TypeMineralComponent implements OnInit {
   public typeMineralService = inject(TypeMineralService);

   public readonly labels = LABELS;
   public tableColumnDefinitions =
      TableColumnDefinitions.getDefaultTypeMineralColumnsDefinitions();
   public selectedTypeMineral: TypeMineral;
   public typeMinerals: TypeMineral[] = [];

   ngOnInit(): void {
      this.getTypeMinerals();
   }

   public getTypeMinerals(): void {
      this.typeMineralService.findAll().subscribe({
         next: (res) => {
            this.typeMinerals = res;
         },
      });
   }

   public setSelected(typeMineral: TypeMineral) {
      this.typeMineralService.setSelectedRow(typeMineral);
      this.selectedTypeMineral = typeMineral;
   }

   public onTableSelfEmision(table: GenericTableComponent<TypeMineral>) {
      this.typeMineralService.eventTableComponent.emit(table);
   }
}
