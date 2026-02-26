import { TableColumnType } from "../enums/table-column-type.enum";
import { BooleanColumnFormatConfig } from "./boolean-column-format-config.interface";
import { ChipStyle } from "./chip-style.interface";

export interface TableColumn<T> {
  field: Extract<keyof T, string>;
  header: string;
  columnType?: TableColumnType;
  width?: number;
  iconExpand?: boolean;
  filterType?: string;
  cssClassName?: string;
  tooltip?: boolean;
  disableSort?: boolean;
  initiallyHidden?: boolean;
  bodyStyle?: string;
  headerStyle?: string;
  isEditable?: boolean;
  headerExtraIcon?: string;
  isFrozen?: boolean;
  chipStyle?: ChipStyle;
  booleanColumnFormatConfig?: BooleanColumnFormatConfig;
}


export interface ModalInfoDefinition<T> {
  field: Extract<keyof T, string>;
  header: string;
  fieldType?: TableColumnType;
}

export interface IChangedSwitch<T> {
  value: boolean;
  nameField: string;
  row: T
}