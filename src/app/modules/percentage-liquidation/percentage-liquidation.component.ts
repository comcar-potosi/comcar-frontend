import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS, TOOLTIPS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { FileService } from '@core/services/file-service.service';
import { MimeTypeEnum } from '@core/enums/mime-type';
import { PercentageLiquidationModule } from './percentage-liquidation.module';
import { PercentageLiquidationService } from './services/percentage-liquidation.service';
import { PercentageLiquidation } from '@core/interfaces/percentage-liquidation.interface';

@Component({
    selector: 'app-percentage-liquidation',
    imports: [PercentageLiquidationModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './percentage-liquidation.component.html'
})
export class LiquidationComponent implements OnInit {

  public percentageLiquidationService = inject(PercentageLiquidationService);
  public fileService = inject(FileService);

  public readonly labels = LABELS;
  public readonly tooltips = TOOLTIPS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultPercentageLiquidationColumnsDefinitions();
  public selectedPercentageLiquidation: PercentageLiquidation;
  public percentageLiquidations: PercentageLiquidation[] = [];

  ngOnInit(): void {
    this.getLiquidations();
  }

  public getLiquidations(): void {
    this.percentageLiquidationService.findAll().subscribe({
      next: (res) => {
        this.percentageLiquidations = res;
      }
    })
  }

  public setSelected(liquidation: PercentageLiquidation) {
    this.percentageLiquidationService.setSelectedRow(liquidation);
    this.selectedPercentageLiquidation = liquidation;
  }

  public onTableSelfEmision(table: GenericTableComponent<PercentageLiquidation>) {
    this.percentageLiquidationService.eventTableComponent.emit(table);
  }

  public getReport() {
     this.percentageLiquidationService.getReport(this.selectedPercentageLiquidation.id).subscribe({
      next: (res) => {
        const file = this.fileService.convertArraybufferToFile(res, 'reporte', MimeTypeEnum.PDF);
        this.fileService.openPdfInNewTab(file);
      }
    })
  }
}
