import { Company } from '@core/interfaces/company.interface';
import { LABELS } from '../constants/labels';
import { TableColumnType } from '../enums/table-column-type.enum';
import { TableColumn } from '../interfaces/table-column-interface';
import { Mineral } from '@core/interfaces/mineral.interface';
import { Mine } from '@core/interfaces/mine.interface';
import { Supplier } from '@core/interfaces/supplier.interface';
import { TypeMineral } from '@core/interfaces/type-mineral.interface';
import { Lot } from '@core/interfaces/lot.interface';
import { Cooperative } from '@core/interfaces/cooperative.interface';
import { Load } from '@core/interfaces/load.interface';
import { AdvanceLoad } from '@core/interfaces/advance-load.interface';
import { Liquidation } from '@core/interfaces/liquidation.interface';
import { User } from '@core/interfaces/user.interface';
import { PercentageLiquidation } from '@core/interfaces/percentage-liquidation.interface';
import { getLoadStatusChipStyle } from '@core/enums/load.enum';

export class TableColumnDefinitions {
   static getDefaultCompanyColumnsDefinitions(): TableColumn<Company>[] {
      return [
         {
            field: 'code',
            header: LABELS.code,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'socialReason',
            header: LABELS.name,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'nit',
            header: LABELS.nit,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'nim',
            header: LABELS.nim,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'address',
            header: LABELS.address,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'cellphone',
            header: LABELS.phone,
            columnType: TableColumnType.NUMERIC,
         },
         {
            field: 'logo',
            header: LABELS.logo,
            columnType: TableColumnType.IMAGE_BASE64,
         },
      ];
   }

   static getDefaultMineralColumnsDefinitions(): TableColumn<Mineral>[] {
      return [
         {
            field: 'name',
            header: LABELS.name,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'symbol',
            header: LABELS.symbol,
            columnType: TableColumnType.TEXT,
         },
      ];
   }

   static getDefaultCooperativeColumnsDefinitions(): TableColumn<Cooperative>[] {
      return [
         {
            field: 'name',
            header: LABELS.name,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'cajaNacional',
            header: LABELS.cajaNacional + ' %',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'fedecomin',
            header: LABELS.fedecomin + ' %',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'fencomin',
            header: LABELS.fencomin + ' %',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'comibol',
            header: LABELS.comibol + ' %',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'wilstermann',
            header: LABELS.wilstermann + ' %',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'cooperativeContribution',
            header: LABELS.cooperativeContribution + ' %',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'miningRoyalties',
            header: LABELS.miningRoyalties + ' %',
            columnType: TableColumnType.AMOUNT,
         },
      ];
   }

   static getDefaultLotColumnsDefinitions(): TableColumn<Lot>[] {
      return [
         {
            field: 'assignment',
            header: LABELS.lotType,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'description',
            header: LABELS.description,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'prefix',
            header: LABELS.prefix,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'initialDocNumber',
            header: LABELS.initialNumber,
            columnType: TableColumnType.NUMERIC,
         },
         {
            field: 'currentDocNumber',
            header: LABELS.currentNumber,
            columnType: TableColumnType.NUMERIC,
         },
         {
            field: 'state',
            header: LABELS.status,
            columnType: TableColumnType.STATUS,
         },
      ];
   }

   static getDefaultTypeMineralColumnsDefinitions(): TableColumn<TypeMineral>[] {
      return [
         {
            field: 'name',
            header: LABELS.name,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'symbol',
            header: LABELS.symbol,
            columnType: TableColumnType.TEXT,
         },
      ];
   }

   static getDefaultMineColumnsDefinitions(): TableColumn<Mine>[] {
      return [
         {
            field: 'name',
            header: LABELS.name,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'description',
            header: LABELS.description,
            columnType: TableColumnType.TEXT,
         },
      ];
   }

   static getDefaultSupplierColumnsDefinitions(): TableColumn<Supplier>[] {
      return [
         {
            field: 'name',
            header: LABELS.name,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'surname',
            header: LABELS.surname,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'documentNumber',
            header: LABELS.docNumber,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'address',
            header: LABELS.address,
            columnType: TableColumnType.TEXT,
         }
      ];
   }

   static getDefaultLoadColumnsDefinitions(): TableColumn<Load>[] {
      return [
         {
            field: 'date',
            header: LABELS.date,
            columnType: TableColumnType.DATE,
         },
         {
            field: 'supplierName',
            header: LABELS.supplier,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'lotDescription',
            header: LABELS.lot,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'correlativeLotCode',
            header: LABELS.internalLot,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'externalLot',
            header: LABELS.lotExternal,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'mineralName',
            header: LABELS.minerals,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'weight',
            header: LABELS.weightKg,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'numberSacks',
            header: LABELS.numberSacks,
            columnType: TableColumnType.NUMERIC,
         },
         {
            field: 'cooperativeName',
            header: LABELS.cooperative,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'mineName',
            header: LABELS.mine,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'observation',
            header: LABELS.observation,
            columnType: TableColumnType.TEXT,
            initiallyHidden: true,
         },
         {
            field: 'state',
            header: LABELS.status,
            columnType: TableColumnType.CHIP,
            chipStyle: getLoadStatusChipStyle
         },
         {
            field: 'createdBy',
            header: LABELS.createdBy,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'updatedBy',
            header: LABELS.updatedBy,
            columnType: TableColumnType.TEXT,
         },
      ];
   }

   static getDefaultAdvanceLoadColumnsDefinitions(): TableColumn<AdvanceLoad>[] {
      return [
         {
            field: 'receiptCode',
            header: LABELS.receiptCode,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'date',
            header: LABELS.date,
            columnType: TableColumnType.DATE,
         },
         {
            field: 'amount',
            header: LABELS.amount,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'concept',
            header: LABELS.concept,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'paymentType',
            header: LABELS.paymentType,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'paymentChanel',
            header: LABELS.paymentedBy,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'checkNumber',
            header: LABELS.checkNumber,
            columnType: TableColumnType.TEXT,
            initiallyHidden: true,
         },
         {
            field: 'observation',
            header: LABELS.observation,
            columnType: TableColumnType.TEXT,
         },
      ];
   }

   static getDefaultLiquidationColumnsDefinitions(): TableColumn<Liquidation>[] {
      return [
         {
            field: 'supplierName',
            header: LABELS.clientName,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'lotId',
            header: LABELS.lot,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'mineralName',
            header: LABELS.minerals,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'lawSilver',
            header: LABELS.lawSilver,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'lawZinc',
            header: LABELS.lawZinc,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'lawLead',
            header: LABELS.lawLead,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'metricWetKilograms',
            header: LABELS.weightKg,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'humidityPercentage',
            header: LABELS.humidityPercentage,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'dryMetricKilograms',
            header: LABELS.solidMetricKilograms,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'cooperativeName',
            header: LABELS.cooperative,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'liquidationDate',
            header: LABELS.liquidationDate,
            columnType: TableColumnType.DATE,
         },
         {
            field: 'firstAdvance',
            header: LABELS.firstAdvance,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'secondAdvance',
            header: LABELS.secondAdvance,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'amountPayableBc',
            header: LABELS.liquidPayable + ' Bs',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'createdBy',
            header: LABELS.createdBy,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'updatedBy',
            header: LABELS.updatedBy,
            columnType: TableColumnType.TEXT,
         },
      ];
   }

   static getDefaultUserColumnsDefinitions(): TableColumn<User>[] {
      return [
         {
            field: 'name',
            header: LABELS.name,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'surname',
            header: LABELS.surname,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'username',
            header: LABELS.userName,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'role',
            header: LABELS.role,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'state',
            header: LABELS.status,
            columnType: TableColumnType.STATUS,
         },
      ];
   }

   static getDefaultPercentageLiquidationColumnsDefinitions(): TableColumn<PercentageLiquidation>[] {
      return [
         {
            field: 'supplierName',
            header: LABELS.clientName,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'percentageLiquidationDate',
            header: LABELS.liquidationDate,
            columnType: TableColumnType.DATE,
         },
         {
            field: 'correlativeLotCode',
            header: LABELS.lot,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'dryMetricKilograms',
            header: LABELS.solidMetricKilograms,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'humidityPercentage',
            header: LABELS.humidityPercentage,
            columnType: TableColumnType.AMOUNT,
            initiallyHidden: true
         },
         {
            field: 'dmSilver',
            header: LABELS.dmSilver,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'quotation',
            header: LABELS.quotation,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'percentage',
            header: LABELS.percentage,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'exchangeRate',
            header: LABELS.exchangeRate,
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'miningRoyalties',
            header: LABELS.miningRoyalties,
            columnType: TableColumnType.AMOUNT,
            initiallyHidden: true
         },
         {
            field: 'comibol',
            header: LABELS.comibol,
            columnType: TableColumnType.AMOUNT,
            initiallyHidden: true
         },
         {
            field: 'cajaNacional',
            header: LABELS.cajaNacional,
            columnType: TableColumnType.AMOUNT,
            initiallyHidden: true
         },
         {
            field: 'fedecomin',
            header: LABELS.fedecomin,
            columnType: TableColumnType.AMOUNT,
            initiallyHidden: true
         },
         {
            field: 'fencomin',
            header: LABELS.fencomin,
            columnType: TableColumnType.AMOUNT,
            initiallyHidden: true
         },
         {
            field: 'firstAdvance',
            header: LABELS.firstAdvance,
            columnType: TableColumnType.AMOUNT
         },
         {
            field: 'fencomin',
            header: LABELS.fencomin,
            columnType: TableColumnType.AMOUNT,
            initiallyHidden: true
         },
         {
            field: 'amountPayableBc',
            header: LABELS.liquidPayable + ' Bs.',
            columnType: TableColumnType.AMOUNT,
         },
         {
            field: 'createdBy',
            header: LABELS.createdBy,
            columnType: TableColumnType.TEXT,
         },
         {
            field: 'updatedBy',
            header: LABELS.updatedBy,
            columnType: TableColumnType.TEXT,
         },
      ];
   }
}
