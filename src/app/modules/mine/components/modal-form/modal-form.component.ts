import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { MineService } from '../../services/mine.service';
import { Mine } from '@core/interfaces/mine.interface';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    standalone: false
})
export class ModalFormComponent {

  private helpersService = inject(HelpersService);
  private mineService = inject(MineService);

  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  public readonly buttons = LABEL_BUTTONS;
  public selectedMine: Mine;
  public openModal: boolean = false;
  public tittleForm: string = "";
  public formMine: FormGroup = FormUtils.getDefaultMineFormGroup();
  private tableComponent: GenericTableComponent<Mine>;
  private isEdit = signal<boolean>(false);


  ngOnInit() {
    this.registerTableComponentListener();
    this.waitForDataSelection();
    this.mineService.eventFormComponent.emit(this);
  };
  
  public hideModal() {
    this.openModal = false;
  };
 
  private openCreate() {
    this.reset();
    this.tittleForm = "Crear mina";
    this.isEdit.set(false);
    this.openModal = true;
  };

  private openEdit(id: number) {
    this.reset();
    this.tittleForm="Editar mina";
    this.mineService.findById(id).subscribe({
      next: (res) => {
        this.isEdit.set(true);
        this.openModal=true;
        this.updateFormValues(res);
      }
    })
  };

  private updateFormValues(Mine: Mine) {
    this.formMine.patchValue({
      ...Mine
    });
  }

  public saveMine() {
    if (this.formMine.valid ) {
      this.isEdit()? this.submit(TypeSubmitEnum.UPDATE): this.submit(TypeSubmitEnum.CREATE);
    }
  };

  private reset(): void {
    this.formMine.reset();
  };

  private submit(type: TypeSubmitEnum) {
    const data: Mine = {
      ...this.formMine.value,
    };
    const service = type == TypeSubmitEnum.CREATE
      ? this.mineService.create(data)
      : this.mineService.update(this.selectedMine.id, data)
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
    this.mineService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  private waitForDataSelection() {
    this.mineService.getSelectedRow().subscribe((Mine) => this.selectedMine = Mine);
  }
  
}
