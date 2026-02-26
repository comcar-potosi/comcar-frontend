import { DataBase } from "./base-common.interface";

export interface Company extends DataBase {
    id: number;
    code: string;
    socialReason: string;
    nit: number;
    purpose: string;
    logo: string;
    nim: string;
    address: string;
    cellphone: string;
}