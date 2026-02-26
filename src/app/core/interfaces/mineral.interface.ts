import { DataBase } from './base-common.interface';

export interface Mineral extends DataBase {
   id: number;
   name: string;
   symbol: string;
}
