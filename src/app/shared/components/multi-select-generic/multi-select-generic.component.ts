import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { DataCommon } from '@core/models/FieldsCommons';
import { IMultiSelectOptions } from '@core/interfaces/multi-select.interface';
import { LABELS } from '@core/constants/labels';
import { i } from '@angular/cdk/data-source.d-Bblv7Zvh';

@Component({
    selector: 'app-multi-select-generic',
    imports: [ReactiveFormsModule, PrimeComponentsModule, FormsModule],
    templateUrl: './multi-select-generic.component.html'
})
export class MultiSelectGenericComponent implements OnInit {

  @Input() options: IMultiSelectOptions[] = [];
  @Input() selectedIds: number[] = [];
  @Input() maxSelectedLabels: number;
  @Input() showListNames: boolean = false;
  @Input() withFloatLabel: boolean = false;
  @Input() label: string = 'Usuarios';
  @Output() eventSelectedIds = new EventEmitter<number[]>();

  public readonly labels = LABELS;
  public selectedList = signal<DataCommon[]>([]);

  ngOnInit(): void {
    if (this.selectedIds.length > 0) {
      this.setOptions(this.selectedIds);
    }
  }

  public setOptions(selectedIds: number[]) {    
    this.eventSelectedIds.emit(selectedIds);
    if (this.showListNames && this.options.length > 0) {
      let list:IMultiSelectOptions[] = [];
      selectedIds?.forEach( id => {
        list.push(this.options.find(o => o.id === id))
      })
      this.selectedList.set(list);
    }
  }

  public deleteOptionOfList(userId: number) {
    const index = this.selectedIds.indexOf(userId);
    const copySelectedIds = [...this.selectedIds];
    copySelectedIds.splice(index, 1);
    this.selectedIds = copySelectedIds;
    this.setOptions(this.selectedIds);
  }

}
