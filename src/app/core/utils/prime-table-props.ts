import { FormGroup } from "@angular/forms";
import { common, TABLE_DESCENDING_SORT_ORDER } from "@core/constants/common";
import { HighlightConfiguration } from "@core/interfaces/highlight-configuration.interface";

export class PrimeTableProps {
  tableStyle: { [klass: string]: any } = { 'min-width': '90rem' };
  rowsPerPageOptions: number[] = [5, 10, 15];
  dataKey: string = 'id';
  sortOrder: 1 | -1 = TABLE_DESCENDING_SORT_ORDER;
  sortField: string = 'id';
  rows: number = common.rows;
  rowTrackBy: (index: number, item: any) => any = (i, item) => item?.id;
  enableCheckboxSelection: boolean = false;
  enableEditByRow: boolean = false;
  enableDeleteByRow: boolean = false;
  highlightProps: HighlightConfiguration = {
    isTemporal: false,
    columns: [],
    ids: []
  };
  reloadTableWithoutUnselectRow: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor(config?: Partial<PrimeTableProps>) {
    Object.assign(this, config);
  }
}
