import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '@core/interfaces/supplier.interface';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    standalone: false
})
export class ModalFormComponent {

  private helpersService = inject(HelpersService);
  private supplierService = inject(SupplierService);

  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  public readonly buttons = LABEL_BUTTONS;
  public selectedSupplier: Supplier;
  public openModal: boolean = false;
  public tittleForm: string = "";
  public formSupplier: FormGroup = FormUtils.getDefaultSupplierFormGroup();
  private tableComponent: GenericTableComponent<Supplier>;
  private isEdit = signal<boolean>(false);


  ngOnInit() {
    this.registerTableComponentListener();
    this.waitForDataSelection();
    this.supplierService.eventFormComponent.emit(this);
  };
  
  public hideModal() {
    this.openModal = false;
  };
 
  private openCreate() {
    this.reset();
    this.tittleForm = "Crear proveedor";
    this.isEdit.set(false);
    this.openModal = true;
  };

  private openEdit(id: number) {
    this.reset();
    this.tittleForm="Editar proveedor";
    this.supplierService.findById(id).subscribe({
      next: (res) => {
        this.isEdit.set(true);
        this.openModal=true;
        this.updateFormValues(res);
      }
    })
  };

  private updateFormValues(Supplier: Supplier) {
    this.formSupplier.patchValue({
      ...Supplier
    });
  }

  public saveSupplier() {
    if (this.formSupplier.valid ) {
      this.isEdit()? this.submit(TypeSubmitEnum.UPDATE): this.submit(TypeSubmitEnum.CREATE);
    }
  };

  private reset(): void {
    this.formSupplier.reset();
  };

  private submit(type: TypeSubmitEnum) {
    const data: Supplier = {
      ...this.formSupplier.value,
    };
    const service = type == TypeSubmitEnum.CREATE
      ? this.supplierService.create(data)
      : this.supplierService.update(this.selectedSupplier.id, data)
    service.subscribe({
      next: () => {
        const message = type == TypeSubmitEnum.CREATE
          ? MESSAGES.recordCreated
          : MESSAGES.recordUpdated;
        this.helpersService.messageNotification(SEVERITY_ENUM.success, "Correcto", message);
        this.hideModal();
        this.reset();
      }, complete: () => {
        this.tableComponent.reload();
      }
    })
  }

  private registerTableComponentListener() {
    this.supplierService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  private waitForDataSelection() {
    this.supplierService.getSelectedRow().subscribe((Supplier) => this.selectedSupplier = Supplier);
  }
  
}
