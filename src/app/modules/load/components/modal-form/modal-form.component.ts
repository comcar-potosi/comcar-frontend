import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { LoadService } from '../../services/load.service';
import { Load } from '@core/interfaces/load.interface';
import { SupplierService } from 'src/app/modules/supplier/services/supplier.service';
import { SupplierSelect } from '@core/interfaces/supplier.interface';
import { LotService } from 'src/app/modules/lot/services/lot.service';
import { Lot } from '@core/interfaces/lot.interface';
import { Mineral } from '@core/interfaces/mineral.interface';
import { MineralService } from 'src/app/modules/mineral/services/mineral.service';
import { TypeMineralService } from 'src/app/modules/type-mineral/services/type-mineral.service';
import { MineService } from 'src/app/modules/mine/services/mine.service';
import { Mine } from '@core/interfaces/mine.interface';
import { CooperativeService } from 'src/app/modules/cooperative/services/cooperative.service';
import { Cooperative } from '@core/interfaces/cooperative.interface';
import { TypeMineral } from '@core/interfaces/type-mineral.interface';
import { LOT_ASSIGNMENT_KEY } from '@core/enums/lot.enum';
import { transformDateBackToDateFront } from '@core/utils/dateFormats';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private helpersService = inject(HelpersService);
   private loadService = inject(LoadService);
   private supplierService = inject(SupplierService);
   private lotService = inject(LotService);
   private mineralService = inject(MineralService);
   private typeMineralService = inject(TypeMineralService);
   private mineService = inject(MineService);
   private cooperativeService = inject(CooperativeService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public selectedLoad: Load;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public suppliers: SupplierSelect[] = [];
   public lots: Lot[] = [];
   public minerals: Mineral[] = [];
   public typeMinerals: TypeMineral[] = [];
   public mines: Mine[] = [];
   public cooperatives: Cooperative[] = [];
   public formLoad: FormGroup = FormUtils.getDefaultLoadFormGroup();
   private tableComponent: GenericTableComponent<Load>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.waitForDataSelection();
      this.loadService.eventFormComponent.emit(this);
      this.loadDataDropdowns();
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.formLoad.patchValue({ date: new Date() });
      this.tittleForm = 'Crear carga';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar carga';
      this.loadService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.openModal = true;
            this.updateFormValues(res);
         },
      });
   }

   private loadDataDropdowns() {
      this.getSuppliers();
      this.getLots();
      this.getMinerals();
      this.getTypeMinerals();
      this.getMines();
      this.getCooperatives();
   }

   private getSuppliers() {
      this.supplierService.getSelect().subscribe({
         next: (res) => {
            this.suppliers = res;
         },
      });
   }

   private getLots() {
      this.lotService.getSearch(true, LOT_ASSIGNMENT_KEY.RECEPTION).subscribe({
         next: (res) => {
            this.lots = res;
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
            this.typeMinerals = res;
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

   public getCorrelativeLot() {
      this.loadService.getCorrelativeLot(this.formLoad.value.lotId).subscribe({
         next: (res) => {
            this.formLoad.patchValue({
               correlativeLotCode: res.correlative,
            });
         },
      });
   }

   public onChangeLot() {
      const lot = this.lots.find(l => l.id == this.formLoad.value.lotId);
      this.formLoad.patchValue({
         correlativeLotCode: lot.correlative,
      });
   }

   private updateFormValues(load: Load) {
      this.formLoad.patchValue({
         ...load,
         date: transformDateBackToDateFront(load.date)
      });
   }

   public saveLoad() {
      if (this.formLoad.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formLoad.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: Load = {
         ...this.formLoad.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.loadService.create(data)
            : this.loadService.update(this.selectedLoad.id, data);
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
      this.loadService.eventTableComponent.subscribe((tableComponent) => {
         this.tableComponent = tableComponent;
      });
   }

   private waitForDataSelection() {
      this.loadService
         .getSelectedRow()
         .subscribe((Load) => (this.selectedLoad = Load));
   }
}
