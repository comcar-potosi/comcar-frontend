import { DataBase } from "./base-common.interface";

export interface Mine extends DataBase {
    id: number;
    name: string;
    description: string;
}