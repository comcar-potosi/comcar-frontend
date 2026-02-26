import { DataBase } from "./base-common.interface";

export interface Cooperative extends DataBase {
    id: number,
    name: string,
    cajaNacional: number,
    fedecomin: number,
    fencomin: number,
    comibol: number,
    wilstermann: number,
    cooperativeContribution: number,
    miningRoyalties: number,
    printCajaNacional: boolean,
    printFedecomin: boolean,
    printFencomin: boolean,
    printComibol: boolean,
    printWilstermann: boolean,
    printCooperativeContribution: boolean,
    printMiningRoyalties: boolean
}