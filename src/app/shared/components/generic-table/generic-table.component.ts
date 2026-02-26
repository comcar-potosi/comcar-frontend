import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { TableColumnType } from 'src/app/core/enums/table-column-type.enum';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { FilterService } from 'primeng/api';
import { AppTemplateNameDirective } from 'src/app/core/directives/app-template-name.directive';
import { PrimeTableProps } from 'src/app/core/utils/prime-table-props';
import { TableColumn } from 'src/app/core/interfaces/table-column-interface';
import { MESSAGES } from 'src/app/core/constants/messages';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { LABELS, PLACEHOLDERS, TOOLTIPS } from '@core/constants/labels';
import { common, TABLE_START_INDEX } from '@core/constants/common';
import { ColumnFilterType } from '@core/enums/column-filter-type.enum';

/**
 * GenericTableComponent provides a reusable and customizable PrimeNG-based table component
 * for displaying, filtering, and selecting local data with support for templates and column toggling.
 *
 * @template T - Type of the data item displayed in the table.
 */
@Component({
  selector: 'app-generic-table',
  standalone: true,
  providers: [FilterService],
  imports: [CommonModule, PrimeComponentsModule, FormsModule, PipesModule],
  templateUrl: './generic-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent<T> {
  /** Custom templates projected via AppTemplateNameDirective. */
  @ContentChildren(AppTemplateNameDirective) templates!: QueryList<AppTemplateNameDirective>;

  /** Reference to the global filter input element. */
  @ViewChild('filter') filter!: ElementRef;

  /** Reference to the PrimeNgTable. */
  @ViewChild('primeTable', { static: true }) table!: Table;

  /** Emits when the parent should request the table data. */
  @Output() requestData = new EventEmitter<void>();

  /** Emits a reference to this component instance. */
  @Output() selfEmitter = new EventEmitter<GenericTableComponent<T>>();

  /** Emits the currently selected row, or null if unselected. */
  @Output() onSelection = new EventEmitter<T | null>();

  /** Table configuration options like sorting, paginator, etc. */
  @Input() tableProps: PrimeTableProps = new PrimeTableProps();

  /** List of data items to display in the table. */
  @Input({ required: true }) items!: T[];

  /** Column configuration for rendering the table. */
  @Input({ required: true }) tableColumnDefinitions: TableColumn<T>[] = [];

  public readonly messages = MESSAGES;
  public readonly labels = LABELS;
  public readonly common = common;
  public readonly tooltips = TOOLTIPS;
  public readonly placeholders = PLACEHOLDERS;

  /** Columns currently visible in the table. */
  public displayedColumns!: TableColumn<T>[];

  /** List of column fields included in global filtering. */
  public tableGlobalFilterFields!: string[];

  /** Currently selected item. */
  public selectedItem: T | null = null;

  /** Column filter type enum reference. */
  public columnFilterTypes = ColumnFilterType;

  /** Table column format type enum reference. */
  public tableColumnFormatTypes = TableColumnType;

  /** Custom left toolbar template (optional). */
  public leftToolbarTemplate: TemplateRef<any> | null = null;

  /** Custom right toolbar template (optional). */
  public rightToolbarTemplate: TemplateRef<any> | null = null;

  /** Custom body template for table rows (optional). */
  public bodyTemplate: TemplateRef<any> | null = null;

  /** Custom row expansion template for table rows (optional). */
  public rowExpansionTemplate: TemplateRef<any> | null = null;

  constructor(private filterService: FilterService) { }

  /** Initializes component state and registers the date filter. */
  ngOnInit() {
    this.initialSetup();
  }

  /** Binds any projected templates after view initialization. */
  ngAfterContentInit() {
    this.setTemplateReferences();
  }

  /**
   * Applies a global filter to the table using the given input event.
   *
   * @param table - PrimeNG Table instance.
   * @param event - DOM input event.
   */
  public onGlobalFilter(event: Event): void {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  /**
   * Updates visible columns after toggling column visibility.
   *
   * @param multiSelectChangeEvent - PrimeNG multi-select change event.
   */
  public onToggleColumns(multiSelectChangeEvent: MultiSelectChangeEvent): void {
    multiSelectChangeEvent.originalEvent?.stopPropagation();
    this.updateToggleColumnDisplay(multiSelectChangeEvent);
    this.tableGlobalFilterFields = this.getGlobalFilterFields();
  }

  /**
   * Clears filters, resets sorting and the global search input to its initial state.
   */
  public clear(): void {
    this.filter.nativeElement.value = '';
    this.table.clearFilterValues();
    this.table.sortField = this.tableProps.sortField;
    this.table.sortOrder = this.tableProps.sortOrder;
    this.table.sortSingle();
  }

  /**
   * Resets row selection and notifies the parent to reload data.
   */
  public reload(): void {
    this.onRowUnselect();
    this.requestData.emit();
    this.table.first = TABLE_START_INDEX;
  }

  /**
   * Emits the currently selected row.
   *
   * @param selectedRow - The selected data item.
   */
  public onRowSelect(selectedRow: T | T[]): void {
    this.emitSelection(selectedRow as T);
  }

  /**
   * Emits null to indicate no row is selected.
   */
  public onRowUnselect(): void {
    this.emitSelection(null);
  }

  /**
   * Internal method to handle row selection emission.
   *
   * @param selectedRow - Selected row or null.
   */
  private emitSelection(selectedRow: T | null): void {
    this.selectedItem = selectedRow;
    this.onSelection.emit(selectedRow);
  }

  /** Performs initial column and filter setup. */
  private initialSetup(): void {
    this.displayedColumns = this.getInitialSelectedColumnsToggle();
    this.tableGlobalFilterFields = this.getGlobalFilterFields();
    this.selfEmitter.emit(this);
  }

  /**
   * Gets the initial set of columns to display (non-hidden).
   */
  private getInitialSelectedColumnsToggle(): TableColumn<T>[] {
    return this.tableColumnDefinitions.filter(col => !col.initiallyHidden);
  }

  /**
   * Returns the list of column fields eligible for global filtering.
   */
  private getGlobalFilterFields(): string[] {
    return this.displayedColumns.reduce<string[]>((acc, { field }) => {
      acc.push(field);
      return acc;
    }, []);
  }

  /**
   * Updates `displayedColumns` after column toggle interaction.
   *
   * @param event - Column toggle change event.
   */
  private updateToggleColumnDisplay(event: MultiSelectChangeEvent): void {
    const selectedColumns = event.value as TableColumn<T>[];
    const toggledItem = event.itemValue as TableColumn<T>;
    const firstColumn = this.tableColumnDefinitions[0];

    this.displayedColumns = selectedColumns.length
      ? this.getColumnsInConsistentOrder(selectedColumns)
      : [toggledItem ?? firstColumn];
  }

  /**
   * Preserves column order consistency after toggling visibility.
   *
   * @param selectedColumns - Columns selected via UI toggle.
   */
  private getColumnsInConsistentOrder(selectedColumns: TableColumn<T>[]): TableColumn<T>[] {
    return this.tableColumnDefinitions.filter(col =>
      selectedColumns.some(selected => selected.field === col.field)
    );
  }

  /**
   * Assigns custom template references (toolbar, body) based on directive name.
   */
  private setTemplateReferences(): void {
    this.templates.forEach(templateDirective => {
      switch (templateDirective.name) {
        case 'leftToolbarTemplate':
          this.leftToolbarTemplate = templateDirective.templateRef;
          break;
        case 'rightToolbarTemplate':
          this.rightToolbarTemplate = templateDirective.templateRef;
          break;
        case 'bodyTemplate':
          this.bodyTemplate = templateDirective.templateRef;
          break;
        case 'rowExpansionTemplate':
          this.rowExpansionTemplate = templateDirective.templateRef;
          break;
        default:
          break;
      }
    });
  }
}

