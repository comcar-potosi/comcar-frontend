import { DataBase } from "./base-common.interface";

export interface AdvanceLoad extends DataBase {
    id: number,
    receiptType: string,
    receiptCode: string,
    date: string,
    amount: number,
    concept: string,
    observation: string,
    paymentType: string,
    checkNumber: string,
    paymentChanel: string,
    loadId: number
}

export interface TotalAdvance {
    loadId: number,
    totalAmount: number
}