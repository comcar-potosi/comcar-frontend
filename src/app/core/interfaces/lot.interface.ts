import { LOT_ASSIGNMENT_VALUE } from "@core/enums/lot.enum";
import { DataBase } from "./base-common.interface";

export interface Lot extends DataBase {
    id: number;
    prefix: string;
    description: string;
    correlative: string;
    initialDocNumber: number;
    currentDocNumber: number;
    assignment: LOT_ASSIGNMENT_VALUE;
    state: boolean;
}