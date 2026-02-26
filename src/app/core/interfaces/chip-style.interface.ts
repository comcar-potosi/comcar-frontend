export interface ChipStyleClass {
  backgroundClass: string;
  textClass: string;
  tooltip?: string;
}

export interface ChipStyle {
  (value: string | boolean): ChipStyleClass;
}

