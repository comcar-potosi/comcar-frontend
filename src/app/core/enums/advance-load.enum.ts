import { DropdownOption } from "@core/interfaces/dropdown-option.interface";

export enum PaymentTypeEnum {
   CASH = 'Efectivo',
   CHECK = 'Cheque',
}

export enum PaymentChanelEnum {
   CASHIER = 'Caja',
   BANK = 'Banco',
}

export const PaymentChanelDropdownOptions: DropdownOption[] = Object.entries(
   PaymentChanelEnum,
).map(([key, label]) => ({
   label,
   value: label,
}));
