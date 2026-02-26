import { LOAD_STATUS_VALUE } from '@core/enums/load.enum';
import { DataBase } from './base-common.interface';

export interface Load extends DataBase {
   id: number;
   supplierId: number;
   lotId: number;
   mineralId: number;
   typeMineralId: number;
   mineId: number;
   cooperativeId: number;
   date: string;
   externalLot: string;
   correlativeLotCode: string;
   numberSacks: number;
   weight: number;
   observation: string;
   supplierName: string;
   lotDescription: string;
   mineralName: string;
   typeMineralName: string;
   mineName: string;
   cooperativeName: string;
   state: LOAD_STATUS_VALUE;
}

export interface CorrelativeLot {
   correlative: string;
}
