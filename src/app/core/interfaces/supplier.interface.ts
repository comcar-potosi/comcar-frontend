import { DataBase } from "./base-common.interface";

export interface Supplier extends DataBase {
    id: number;
    name: string;
    surname: string;
    documentNumber: string;
    address: string;
    expeditionPlace: string;
}

export interface SupplierSelect {
    id: number;
    documentNumber: string;
    fullName: string;
}