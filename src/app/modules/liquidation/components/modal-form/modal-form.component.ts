import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { LiquidationService } from '../../services/liquidation.service';
import { Liquidation } from '@core/interfaces/liquidation.interface';
import { LoadService } from 'src/app/modules/load/services/load.service';
import { SupplierService } from 'src/app/modules/supplier/services/supplier.service';
import { CooperativeService } from 'src/app/modules/cooperative/services/cooperative.service';
import { MineService } from 'src/app/modules/mine/services/mine.service';
import { Load } from '@core/interfaces/load.interface';
import { Mine } from '@core/interfaces/mine.interface';
import { Cooperative } from '@core/interfaces/cooperative.interface';
import { LIQUIDATION_TYPE_ENUM } from '@core/enums/liquidation-type';
import { LIMITS } from '@core/constants/limits';
import { SupplierSelect } from '@core/interfaces/supplier.interface';
import { transformDateBackToDateFront } from '@core/utils/dateFormats';
import { MineralService } from 'src/app/modules/mineral/services/mineral.service';
import { TypeMineralService } from 'src/app/modules/type-mineral/services/type-mineral.service';
import { Mineral } from '@core/interfaces/mineral.interface';
import { TypeMineral } from '@core/interfaces/type-mineral.interface';
import { LOAD_STATUS_KEY } from '@core/enums/load.enum';
import { AdvanceLoadService } from 'src/app/modules/advance-load/services/advance-load.service';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private liquidationService = inject(LiquidationService);
   private loadService = inject(LoadService);
   private supplierService = inject(SupplierService);
   private mineService = inject(MineService);
   private cooperativeService = inject(CooperativeService);
   private mineralService = inject(MineralService);
   private typeMineralService = inject(TypeMineralService);
   private advanceLoadService = inject(AdvanceLoadService);
   private helpersService = inject(HelpersService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public readonly limits = LIMITS;
   public liquidationTypes = LIQUIDATION_TYPE_ENUM;
   public loads: Load[] = [];
   public suppliers: SupplierSelect[] = [];
   public mines: Mine[] = [];
   public cooperatives: Cooperative[] = [];
   public minerals: Mineral[] = [];
   public typeMineral: TypeMineral[] = [];
   public correlativeLotCode = signal<string>('');
   public selectedLiquidation: Liquidation;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public totalSilver: number = 0;
   public totalZinc: number = 0;
   public totalLead: number = 0;
   public miningRoyaltiesDiscount: number = 0;
   public cajaNacionalDiscount: number = 0;
   public fedecominDiscount: number = 0;
   public fencominDiscount: number = 0;
   public comibolDiscount: number = 0;
   public cooperativeContributionDiscount: number = 0;
   public solidMetricTonnes: number = 0;
   public totalMineralsUsd: number = 0;
   public totalMineralsBs: number = 0;
   public totalImportBs: number = 0;
   public totalDiscountsBs: number = 0;
   public liquidPayableBs: number = 0;
   public liquidPayableUsd: number = 0;
   public formLiquidation: FormGroup = FormUtils.getDefaultLiquidationFormGroup();
   private tableComponent: GenericTableComponent<Liquidation>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.loadData();
      this.waitForDataSelection();
      this.liquidationService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.getLoads();
      this.formLiquidation.patchValue({
         liquidationDate: new Date(),
         exchangeRateAmountPayable: 6.96
      });
      this.tittleForm = 'Crear liquidación';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar liquidación';
      this.liquidationService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.updateFormValues(res);
            this.getLoads();
            this.openModal = true;
         },
      });
   }

   public getTotalAdvance() {
      this.advanceLoadService.getTotalAdvance(this.formLiquidation.value.loadId).subscribe({
         next: (res) => {
            this.formLiquidation.patchValue({
               firstAdvance: res.totalAmount
            })
         },
      });
   }

   private loadData() {
      this.getSuppliers();
      this.getMines();
      this.getCooperatives();
      this.getMinerals();
      this.getTypeMinerals();
   }

   private getLoads() {
      if (this.isEdit()) {
         this.loadService.findById(this.selectedLiquidation.loadId).subscribe({
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

   private getMines() {
      this.mineService.findAll().subscribe({
         next: (res) => {
            this.mines = res;
         },
      });
   }

   private getCooperatives() {
      this.cooperativeService.findAll().subscribe({
         next: (res) => {
            this.cooperatives = res;
         },
      });
   }
   
   private getMinerals() {
      this.mineralService.findAll().subscribe({
         next: (res) => {
            this.minerals = res;
         },
      });
   }
   
   private getTypeMinerals() {
      this.typeMineralService.findAll().subscribe({
         next: (res) => {
            this.typeMineral = res;
         },
      });
   }

   private updateFormValues(liquidation: Liquidation) {
      this.formLiquidation.patchValue({
         ...liquidation,
         admissionDate: transformDateBackToDateFront(liquidation.admissionDate),
         liquidationDate: transformDateBackToDateFront(liquidation.liquidationDate)
      });
      this.calculateSolidMetricWetTonnes();
   }

   public saveLiquidation() {
      if (this.formLiquidation.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formLiquidation.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: Liquidation = {
         ...this.formLiquidation.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.liquidationService.create(data)
            : this.liquidationService.update(this.selectedLiquidation.id, data);
      service.subscribe({
         next: () => {
            const message =
               type == TypeSubmitEnum.CREATE
                  ? MESSAGES.recordCreated
                  : MESSAGES.recordUpdated;
            this.helpersService.messageNotification(
               SEVERITY_ENUM.success,
               'Correcto',
               message,
            );
            this.hideModal();
            this.reset();
         },
         complete: () => {
            this.tableComponent.reload();
         },
      });
   }

   private registerTableComponentListener() {
      this.liquidationService.eventTableComponent.subscribe(
         (tableComponent) => {
            this.tableComponent = tableComponent;
         },
      );
   }

   private waitForDataSelection() {
      this.liquidationService
         .getSelectedRow()
         .subscribe((Liquidation) => (this.selectedLiquidation = Liquidation));
   }

   public onChangedLiquidationType() {
      if (this.formLiquidation.value.liquidationType == LIQUIDATION_TYPE_ENUM.PARTICULAR) {
         this.formLiquidation.get('cooperativeId').removeValidators(Validators.required);
         this.formLiquidation.get('mineId').removeValidators(Validators.required);
      } else {
         this.formLiquidation.get('cooperativeId').addValidators(Validators.required);
         this.formLiquidation.get('mineId').addValidators(Validators.required);
      }
      this.formLiquidation.get('quotationSilver').reset();
      this.formLiquidation.get('quotationZinc').reset();
      this.formLiquidation.get('quotationLead').reset();
      this.formLiquidation.get('cooperativeId').updateValueAndValidity();
      this.formLiquidation.get('mineId').updateValueAndValidity();
   }

   public onChagedLoad() {
      
      this.getTotalAdvance();
      const load: Load = this.loads.find(l => l.id == this.formLiquidation.value.loadId);
      this.correlativeLotCode.set(load.correlativeLotCode);
      if (!this.isEdit()) {
         this.formLiquidation.patchValue({
            admissionDate: new Date(load.date + ' '),
            supplierId: load.supplierId,
            cooperativeId: load.cooperativeId,
            mineralId: load.mineralId,
            typeMineralId: load.typeMineralId,
            mineId: load.mineId,
            metricWetKilograms: load.weight
         });
         this.onChangedWetKilograms();
         this.onChangedCooperative();
      }
   }

   public onChangedCooperative() {
      const cooperative: Cooperative = this.cooperatives.find((c) => c.id == this.formLiquidation.value.cooperativeId);
      if (!this.isEdit()) {
         this.formLiquidation.patchValue({
            quotationSilver: 0,
            quotationZinc: 0,
            quotationLead: 0,
            cajaNacional: cooperative?.cajaNacional || 0,
            fedecomin: cooperative?.fedecomin || 0,
            fencomin: cooperative?.fencomin || 0,
            comibol: cooperative?.comibol || 0,
            cooperativeContribution: cooperative?.cooperativeContribution || 0,
            miningRoyalties: cooperative?.miningRoyalties || 0,
         });
         this.calculateDiscounts();
      }
   }

   public onChangedWetKilograms() {
      this.calculateSolidMetricWetTonnes();
   }

   public calculateSolidMetricWetTonnes() {
      const metricWetTonnes = (this.formLiquidation.get('metricWetKilograms')?.value || 0) / 1000;
      const percentHumidity: number = this.formLiquidation.get('humidityPercentage')?.value / 100 || 0;
      const humidityInTonnes: number = metricWetTonnes * percentHumidity;
      this.solidMetricTonnes = metricWetTonnes - humidityInTonnes;
      this.calculateTotalsPriceAndLaws();
   }

   public calculateTotalsPriceAndLaws() {
      this.totalSilver = (this.formLiquidation.get('priceSilver').value || 0) * (this.formLiquidation.get('lawSilver').value || 0);
      this.totalZinc = (this.formLiquidation.get('priceZinc').value || 0) * (this.formLiquidation.get('lawZinc').value || 0);
      this.totalLead = (this.formLiquidation.get('priceLead').value || 0) * (this.formLiquidation.get('lawLead').value || 0);
      this.totalMineralsUsd = this.totalSilver + this.totalZinc + this.totalLead;
      this.totalMineralsBs = this.totalMineralsUsd * (this.formLiquidation.get('exchangeRate').value || 0);
      this.totalImportBs = this.totalMineralsBs * this.solidMetricTonnes;
      this.calculateDiscounts();
   }

   public calculateDiscounts() {
      this.miningRoyaltiesDiscount = this.totalImportBs * ((this.formLiquidation.get('miningRoyalties').value || 0) / 100);
      this.cajaNacionalDiscount = this.totalImportBs * ((this.formLiquidation.get('cajaNacional').value || 0) / 100);
      this.fedecominDiscount = this.totalImportBs * ((this.formLiquidation.get('fedecomin').value || 0) / 100);
      this.fencominDiscount = this.totalImportBs * ((this.formLiquidation.get('fencomin').value || 0) / 100);
      this.comibolDiscount = this.totalImportBs * ((this.formLiquidation.get('comibol').value || 0) / 100);
      this.cooperativeContributionDiscount = this.totalImportBs * ((this.formLiquidation.get('cooperativeContribution').value || 0) / 100);
      this.calculateRoyalties();
   }

   private calculateRoyalties() {
      this.calculateRoyaltySilver();
      this.calculateRoyaltyZincAndLead(true);
      this.calculateRoyaltyZincAndLead(false);
   }

   public calculateRoyaltySilver() {
      const gramsSilver = this.solidMetricTonnes * (this.formLiquidation.get('lawSilver').value || 0) * 100;
      const troyOuncesSilver = gramsSilver / 31.1035;
      const grossValueSilver = troyOuncesSilver * (this.formLiquidation.get('quotationSilver').value || 0) * 6.96;
      const royaltySilver = (grossValueSilver * 0.036).toFixed(2);
      this.formLiquidation.patchValue({ royaltySilver: royaltySilver });
      this.calculateTotals();
   }

   public calculateRoyaltyZincAndLead(isZinc: boolean) {
      const lawValue: number = isZinc
         ? this.formLiquidation.get('lawZinc').value || 0
         : this.formLiquidation.get('lawLead').value || 0;
      const quotationValue: number = isZinc
         ? this.formLiquidation.get('quotationZinc').value || 0
         : this.formLiquidation.get('quotationLead').value || 0;

      const pounds =  this.solidMetricTonnes * 1000 * 2.2046223;
      const finePounds = pounds * (lawValue / 100);
      const grossValue = finePounds * quotationValue * 6.96
      const royalty = (grossValue * 0.03).toFixed(2);
      isZinc
         ? this.formLiquidation.patchValue({ royaltyZinc: royalty })
         : this.formLiquidation.patchValue({ royaltyLead: royalty });
      this.calculateTotals();
   }

   public calculateTotals() {
      this.totalDiscountsBs =
         this.miningRoyaltiesDiscount +
         parseFloat(this.formLiquidation.value.firstAdvance?? 0)  +
         parseFloat(this.formLiquidation.value.secondAdvance?? 0)  +
         parseFloat(this.formLiquidation.value.royaltySilver?? 0)  +
         parseFloat(this.formLiquidation.value.royaltyZinc?? 0)  +
         parseFloat(this.formLiquidation.value.royaltyLead?? 0)  +
         this.cajaNacionalDiscount +
         this.fedecominDiscount +
         this.fencominDiscount +
         this.comibolDiscount +
         this.cooperativeContributionDiscount;
      this.liquidPayableBs = this.totalImportBs - this.totalDiscountsBs + parseFloat(this.formLiquidation.value.transportationBonus?? 0);
      this.calculateTotalUSD();
   }
   
   public calculateTotalUSD() {
      this.liquidPayableUsd = this.liquidPayableBs / (this.formLiquidation.value.exchangeRateAmountPayable?? 1);
   }
}
