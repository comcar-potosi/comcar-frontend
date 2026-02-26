export const common = {
  rows: 10,
  minimumRows: 5,
  rowsPerPageOptions: [5, 10, 15],
  inputDebounceDelay: 1000,
  budgetTypeExpenseCode: '2',
  dateDisplayFormat: 'dd/MM/yyyy',
  dateTimeDisplayFormat: 'dd/MM/yyyy HH:mm',
  dateForBack: 'yyyy-MM-dd',
  decimalsAllowed: '.2-2',
  numberLocaleFormat: 'en-US',
  basePage: '/welcome'
} as const

export const TABLE_ASCENDING_SORT_ORDER = 1;
export const TABLE_DESCENDING_SORT_ORDER = -1;
export const PAGE_OFFSET = 1;
export const TABLE_START_INDEX = 0;