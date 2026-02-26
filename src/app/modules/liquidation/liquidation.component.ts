import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS, TOOLTIPS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { LiquidationModule } from './liquidation.module';
import { LiquidationService } from './services/liquidation.service';
import { Liquidation } from '@core/interfaces/liquidation.interface';
import { FileService } from '@core/services/file-service.service';
import { MimeTypeEnum } from '@core/enums/mime-type';

@Component({
    selector: 'app-liquidation',
    imports: [LiquidationModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './liquidation.component.html'
})
export class LiquidationComponent implements OnInit {

  public liquidationService = inject(LiquidationService);
  public fileService = inject(FileService);

  public readonly labels = LABELS;
  public readonly tooltips = TOOLTIPS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultLiquidationColumnsDefinitions();
  public selectedLiquidation: Liquidation;
  public liquidations: Liquidation[] = [];

  ngOnInit(): void {
    this.getLiquidations();
  }

  public getLiquidations(): void {
    this.liquidationService.findAll().subscribe({
      next: (res) => {
        this.liquidations = res;
      }
    })
  }

  public setSelected(liquidation: Liquidation) {
    this.liquidationService.setSelectedRow(liquidation);
    this.selectedLiquidation = liquidation;
  }

  public onTableSelfEmision(table: GenericTableComponent<Liquidation>) {
    this.liquidationService.eventTableComponent.emit(table);
  }

  public getReport() {
     this.liquidationService.getReport(this.selectedLiquidation.id).subscribe({
      next: (res) => {
        const file = this.fileService.convertArraybufferToFile(res, 'reporte', MimeTypeEnum.PDF);
        this.fileService.openPdfInNewTab(file);
      }
    })
  }
}
