import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { CooperativeService } from '../../services/cooperative.service';
import { Cooperative } from '@core/interfaces/cooperative.interface';
import { LIMITS } from '@core/constants/limits';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    standalone: false
})
export class ModalFormComponent {

  private helpersService = inject(HelpersService);
  private cooperativeService = inject(CooperativeService);

  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  public readonly buttons = LABEL_BUTTONS;
  public readonly limits = LIMITS;
  public selectedCooperative: Cooperative;
  public openModal: boolean = false;
  public tittleForm: string = "";
  public formCooperative: FormGroup = FormUtils.getDefaultCooperativeFormGroup();
  private tableComponent: GenericTableComponent<Cooperative>;
  private isEdit = signal<boolean>(false);


  ngOnInit() {
    this.registerTableComponentListener();
    this.waitForDataSelection();
    this.cooperativeService.eventFormComponent.emit(this);
  };
  
  public hideModal() {
    this.openModal = false;
  };
 
  private openCreate() {
    this.reset();
    this.tittleForm = "Crear cooperativa";
    this.isEdit.set(false);
    this.openModal = true;
    this.formCooperative.patchValue({
      printCajaNacional: true,
      printFedecomin: true,
      printFencomin: true,
      printComibol: true,
      printCooperativeContribution: true,
      printMiningRoyalties: true
    })
  };

  private openEdit(id: number) {
    this.reset();
    this.tittleForm="Editar cooperativa";
    this.cooperativeService.findById(id).subscribe({
      next: (res) => {
        this.isEdit.set(true);
        this.openModal=true;
        this.updateFormValues(res);
      }
    })
  };

  private updateFormValues(Cooperative: Cooperative) {
    this.formCooperative.patchValue({
      ...Cooperative
    });
  }

  public saveCooperative() {
    if (this.formCooperative.valid ) {
      this.isEdit()? this.submit(TypeSubmitEnum.UPDATE): this.submit(TypeSubmitEnum.CREATE);
    }
  };

  private reset(): void {
    this.formCooperative.reset();
    this.formCooperative.patchValue({
      cajaNacional: 0,
      fedecomin: 0,
      fencomin: 0,
      comibol: 0,
      wilstermann: 0,
      cooperativeContribution: 0,
      miningRoyalties: 0
    })
  };

  private submit(type: TypeSubmitEnum) {
    const data: Cooperative = {
      ...this.formCooperative.value,
    };
    const service = type == TypeSubmitEnum.CREATE
      ? this.cooperativeService.create(data)
      : this.cooperativeService.update(this.selectedCooperative.id, data)
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
    this.cooperativeService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  private waitForDataSelection() {
    this.cooperativeService.getSelectedRow().subscribe((Cooperative) => this.selectedCooperative = Cooperative);
  }
  
}
