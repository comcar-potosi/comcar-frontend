import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { LoadService } from 'src/app/modules/load/services/load.service';
import { SupplierService } from 'src/app/modules/supplier/services/supplier.service';
import { Load } from '@core/interfaces/load.interface';
import { LIMITS } from '@core/constants/limits';
import { SupplierSelect } from '@core/interfaces/supplier.interface';
import { transformDateBackToDateFront } from '@core/utils/dateFormats';
import { LOAD_STATUS_KEY } from '@core/enums/load.enum';
import { AdvanceLoadService } from 'src/app/modules/advance-load/services/advance-load.service';
import { PercentageLiquidationService } from '../../services/percentage-liquidation.service';
import { PercentageLiquidation } from '@core/interfaces/percentage-liquidation.interface';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private percentageLiquidationService = inject(PercentageLiquidationService);
   private loadService = inject(LoadService);
   private supplierService = inject(SupplierService);
   private advanceLoadService = inject(AdvanceLoadService);
   private helpersService = inject(HelpersService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public readonly limits = LIMITS;
   public selectedPercentageLiquidation: PercentageLiquidation;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public loads: Load[] = [];
   public suppliers: SupplierSelect[] = [];
   public correlativeLotCode = signal<string>('');
   public miningRoyaltiesDiscount: number = 0;
   public cajaNacionalDiscount: number = 0;
   public fedecominDiscount: number = 0;
   public fencominDiscount: number = 0;
   public comibolDiscount: number = 0;
   public solidMetricTonnes: number = 0;
   public solidMetricKilograms: number = 0;
   public totalImportBs: number = 0;
   public totalDiscountsBs: number = 0;
   public liquidPayableBs: number = 0;
   public formPercentageLiquidation: FormGroup = FormUtils.getDefaultPercentageLiquidationFormGroup();
   private tableComponent: GenericTableComponent<PercentageLiquidation>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.loadData();
      this.waitForDataSelection();
      this.percentageLiquidationService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.getLoads();
      this.formPercentageLiquidation.patchValue({
         liquidationDate: new Date(),
      });
      this.tittleForm = 'Crear liquidación';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar liquidación';
      this.percentageLiquidationService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.updateFormValues(res);
            this.getLoads();
            this.openModal = true;
         },
      });
   }

   public getTotalAdvance() {
      this.advanceLoadService.getTotalAdvance(this.formPercentageLiquidation.value.loadId).subscribe({
         next: (res) => {
            this.formPercentageLiquidation.patchValue({
               firstAdvance: res.totalAmount
            })
         },
      });
   }

   private loadData() {
      this.getSuppliers();
   }

   private getLoads() {
      if (this.isEdit()) {
         this.loadService.findById(this.selectedPercentageLiquidation.loadId).subscribe({
            next: (res) => {
               this.loads = [res];
               this.onChagedLoad();
            },
         });
      } else {
         this.loadService.getSearch(LOAD_STATUS_KEY.PENDING).subscribe({
            next: (res) => {
               this.loads = res;
            },
         });
      }
   }

   private getSuppliers() {
      this.supplierService.getSelect().subscribe({
         next: (res) => {
            this.suppliers = res;
         },
      });
   }

   private updateFormValues(liquidation: PercentageLiquidation) {
      this.formPercentageLiquidation.patchValue({
         ...liquidation,
         admissionDate: transformDateBackToDateFront(liquidation.admissionDate),
         percentageLiquidationDate: transformDateBackToDateFront(liquidation.percentageLiquidationDate)
      });
      this.calculateSolidMetricWetTonnes();
   }

   public saveLiquidation() {
      if (this.formPercentageLiquidation.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formPercentageLiquidation.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: PercentageLiquidation = {
         ...this.formPercentageLiquidation.value,
      };
      const service = type == TypeSubmitEnum.CREATE
         ? this.percentageLiquidationService.create(data)
         : this.percentageLiquidationService.update(this.selectedPercentageLiquidation.id, data);
      service.subscribe({
         next: () => {
            const message = type == TypeSubmitEnum.CREATE
               ? MESSAGES.recordCreated
               : MESSAGES.recordUpdated;
            this.helpersService.messageNotification(SEVERITY_ENUM.success, 'Correcto', message);
            this.hideModal();
            this.reset();
         },
         complete: () => {
            this.tableComponent.reload();
         },
      });
   }

   private registerTableComponentListener() {
      this.percentageLiquidationService.eventTableComponent.subscribe( tableComponent => {
         this.tableComponent = tableComponent;
      });
   }

   private waitForDataSelection() {
      this.percentageLiquidationService.getSelectedRow()
         .subscribe(PercentageLiquidation => this.selectedPercentageLiquidation = PercentageLiquidation);
   }

   public onChagedLoad() { 
      this.getTotalAdvance();
      const load: Load = this.loads.find(l => l.id == this.formPercentageLiquidation.value.loadId);
      this.correlativeLotCode.set(load.correlativeLotCode);
      if (!this.isEdit()) {
         this.formPercentageLiquidation.patchValue({
            admissionDate: new Date(load.date + ' '),
            supplierId: load.supplierId,
            metricWetKilograms: load.weight
         });
         this.calculateSolidMetricWetTonnes();
      }
   }

   public calculateSolidMetricWetTonnes() {
      const metricWetTonnes = (this.formPercentageLiquidation.get('metricWetKilograms')?.value || 0) / 1000;
      const percentHumidity: number = this.formPercentageLiquidation.get('humidityPercentage')?.value / 100 || 0;
      const humidityInTonnes: number = metricWetTonnes * percentHumidity;
      this.solidMetricTonnes = metricWetTonnes - humidityInTonnes;
      this.solidMetricKilograms = this.solidMetricTonnes * 1000;
      this.calculateDiscounts();
      this.calculateTotalImport();
   }

   public calculateTotalImport() {
      const leyConvertida = ((this.formPercentageLiquidation.get('dmSilver').value || 0) * 100) / 31.1035;
      const percentage = (this.formPercentageLiquidation.get('percentage').value || 0) / 100;
      const valorBrutoAg = leyConvertida * (this.formPercentageLiquidation.get('quotation').value || 0) * percentage ;
      const valorPorKilo = (valorBrutoAg / 1000) * (this.formPercentageLiquidation.get('exchangeRate').value || 0);
      this.totalImportBs = valorPorKilo * this.solidMetricKilograms;
      this.calculateDiscounts();
   }

   public calculateDiscounts() {
      this.miningRoyaltiesDiscount = this.totalImportBs * ((this.formPercentageLiquidation.get('miningRoyalties').value || 0) / 100);
      this.cajaNacionalDiscount = this.totalImportBs * ((this.formPercentageLiquidation.get('cajaNacional').value || 0) / 100);
      this.fedecominDiscount = this.totalImportBs * ((this.formPercentageLiquidation.get('fedecomin').value || 0) / 100);
      this.fencominDiscount = this.totalImportBs * ((this.formPercentageLiquidation.get('fencomin').value || 0) / 100);
      this.comibolDiscount = this.totalImportBs * ((this.formPercentageLiquidation.get('comibol').value || 0) / 100);
      this.calculateTotals();
   }

   public calculateTotals() {
      this.totalDiscountsBs =
         this.miningRoyaltiesDiscount +
         this.cajaNacionalDiscount +
         this.fedecominDiscount +
         this.fencominDiscount +
         this.comibolDiscount +
         parseFloat(this.formPercentageLiquidation.value.firstAdvance?? 0);
      this.liquidPayableBs = this.totalImportBs - this.totalDiscountsBs + parseFloat(this.formPercentageLiquidation.value.transportationBonus?? 0);
   }
}
