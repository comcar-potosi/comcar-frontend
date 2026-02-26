import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noSpaceValidator } from '../validators/noSpaceValidator';
import { regex } from '@core/constants/regexs';
import { LIMITS } from '@core/constants/limits';
import { LOT_ASSIGNMENT_KEY } from '@core/enums/lot.enum';

export class FormUtils {
   static getDefaultCompanyFormGroup(): FormGroup {
      return new FormGroup({
         code: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldCode),
            Validators.minLength(LIMITS.minLengthCode),
            noSpaceValidator,
         ]),
         socialReason: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         nit: new FormControl<number>(null, [Validators.required]),
         purpose: new FormControl<string>(''),
         logo: new FormControl<string>(''),
         nim: new FormControl<string>(''),
         address: new FormControl<string>(''),
         cellphone: new FormControl<string>(''),
      });
   }

   static getDefaultUserFormGroup(): FormGroup {
      return new FormGroup({
         name: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLengthCode),
            noSpaceValidator,
         ]),
         surname: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLengthCode),
            noSpaceValidator,
         ]),
         username: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLengthCode),
            noSpaceValidator,
         ]),
         password: new FormControl<string>('', [ Validators.required, Validators.minLength(LIMITS.minLengthPassword), noSpaceValidator]),
         role: new FormControl<string>('', [ Validators.required]),
         state: new FormControl<string>('', [ Validators.required])
      });
   }

   static getDefaultResetPasswordFormGroup(): FormGroup {
      return new FormGroup({
         newPassword: new FormControl<string>('', [ Validators.required, Validators.minLength(LIMITS.minLengthPassword), noSpaceValidator]),
         confirmationPassword: new FormControl<string>('', [ Validators.required, Validators.minLength(LIMITS.minLengthPassword), noSpaceValidator])
      });
   }

   static getDefaultMineralFormGroup(): FormGroup {
      return new FormGroup({
         name: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLengthCode),
            noSpaceValidator,
         ]),
         symbol: new FormControl<string>('', [
            Validators.required,
            noSpaceValidator,
         ]),
      });
   }

   static getDefaultTypeMineralFormGroup(): FormGroup {
      return new FormGroup({
         name: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         symbol: new FormControl<string>('', [
            Validators.required,
            noSpaceValidator,
         ]),
      });
   }

   static getDefaultLLotFormGroup(): FormGroup {
      return new FormGroup({
         prefix: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldCode),
            noSpaceValidator,
         ]),
         description: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         initialDocNumber: new FormControl<string>('', [Validators.required]),
         assignment: new FormControl<LOT_ASSIGNMENT_KEY>(LOT_ASSIGNMENT_KEY.RECEPTION, [
            Validators.required,
         ]),
         state: new FormControl<boolean>(true, [Validators.required]),
      });
   }

   static getDefaultMineFormGroup(): FormGroup {
      return new FormGroup({
         name: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         description: new FormControl<string>('', [noSpaceValidator]),
      });
   }

   static getDefaultSupplierFormGroup(): FormGroup {
      return new FormGroup({
         name: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         surname: new FormControl<string>('', [
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         documentNumber: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldDocument),
            Validators.minLength(LIMITS.minLengthDocument),
            noSpaceValidator,
         ]),
         address: new FormControl<string>('', [
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         expeditionPlace: new FormControl<string>(''),
      });
   }

   static getDefaultCooperativeFormGroup(): FormGroup {
      return new FormGroup({
         name: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(regex.fieldName),
            Validators.minLength(LIMITS.minLength),
            noSpaceValidator,
         ]),
         cajaNacional: new FormControl<number>(0, [
            Validators.required,
            Validators.min(LIMITS.minPercent),
            Validators.max(LIMITS.maxPercent),
         ]),
         fedecomin: new FormControl<number>(0, [
            Validators.required,
            Validators.min(LIMITS.minPercent),
            Validators.max(LIMITS.maxPercent),
         ]),
         fencomin: new FormControl<number>(0, [
            Validators.required,
            Validators.min(LIMITS.minPercent),
            Validators.max(LIMITS.maxPercent),
         ]),
         comibol: new FormControl<number>(0, [
            Validators.required,
            Validators.min(LIMITS.minPercent),
            Validators.max(LIMITS.maxPercent),
         ]),
         wilstermann: new FormControl<number>(0, [
            Validators.required,
            Validators.min(LIMITS.minPercent),
            Validators.max(LIMITS.maxPercent),
         ]),
         cooperativeContribution: new FormControl<number>(0, [
            Validators.required,
            Validators.min(LIMITS.minPercent),
            Validators.max(LIMITS.maxPercent),
         ]),
         miningRoyalties: new FormControl<number>(0, [
            Validators.required,
            Validators.min(LIMITS.minPercent),
            Validators.max(LIMITS.maxPercent),
         ]),
         printCajaNacional: new FormControl<boolean>(true, []),
         printFedecomin: new FormControl<boolean>(true, []),
         printFencomin: new FormControl<boolean>(true, []),
         printComibol: new FormControl<boolean>(true, []),
         printWilstermann: new FormControl<boolean>(true, []),
         printCooperativeContribution: new FormControl<boolean>(true, []),
         printMiningRoyalties: new FormControl<boolean>(true, []),
      });
   }

   static getDefaultLoadFormGroup(): FormGroup {
      return new FormGroup({
         supplierId: new FormControl<number>(null, [Validators.required]),
         date: new FormControl<string>(null, [Validators.required]),
         lotId: new FormControl<number>(null, [Validators.required]),
         correlativeLotCode: new FormControl<string>('', [Validators.required]),
         mineralId: new FormControl<number>(null, [Validators.required]),
         typeMineralId: new FormControl<number>(null, [Validators.required]),
         weight: new FormControl<number>(null, [Validators.required]),
         numberSacks: new FormControl<number>(null),
         mineId: new FormControl<number>(null),
         cooperativeId: new FormControl<number>(null),
         observation: new FormControl<string>(''),
      });
   }

   static getDefaultAdvanceLoadFormGroup(): FormGroup {
      return new FormGroup({
         loadId: new FormControl<number>(null, [Validators.required]),
         receiptCode: new FormControl<number>(null, [Validators.required]),
         date: new FormControl<string>('', [Validators.required]),
         amount: new FormControl<number>(null, [Validators.required]),
         concept: new FormControl<number>(null, [Validators.required]),
         paymentType: new FormControl<string>('', [Validators.required]),
         paymentChanel: new FormControl<string>('', [Validators.required]),
         checkNumber: new FormControl<string>(''),
         observation: new FormControl<string>(''),
      });
   }

   static getDefaultLiquidationFormGroup(): FormGroup {
      return new FormGroup({
         liquidationType: new FormControl<string>('', [Validators.required]),
         loadId: new FormControl<number>(null, [Validators.required]),
         supplierId: new FormControl<number>(null, [Validators.required]),
         mineralId: new FormControl<number>(null, [Validators.required]),
         typeMineralId: new FormControl<number>(null, [Validators.required]),
         cooperativeId: new FormControl<number>(null, [Validators.required]),
         mineId: new FormControl<number>(null, [Validators.required]),
         admissionDate: new FormControl<string>('', [Validators.required]),
         liquidationDate: new FormControl<string>('', [Validators.required]),
         exchangeRate: new FormControl<number>(null, [Validators.required]),
         exchangeRateAmountPayable: new FormControl<number>(null, [Validators.required]),
         priceSilver: new FormControl<number>(null),
         priceZinc: new FormControl<number>(null),
         priceLead: new FormControl<number>(null),
         lawSilver: new FormControl<number>(null),
         lawZinc: new FormControl<number>(null),
         lawLead: new FormControl<number>(null),
         humidityPercentage: new FormControl<number>(null, [Validators.required,]),
         metricWetKilograms: new FormControl<number>(null, [Validators.required]),
         miningRoyalties: new FormControl<number>(null),
         quotationSilver: new FormControl<number>(null),
         quotationZinc: new FormControl<number>(null),
         quotationLead: new FormControl<number>(null),
         royaltySilver: new FormControl<number>(null),
         royaltyZinc: new FormControl<number>(null),
         royaltyLead: new FormControl<number>(null),
         cajaNacional: new FormControl<number>(null),
         fedecomin: new FormControl<number>(null),
         fencomin: new FormControl<number>(null),
         comibol: new FormControl<number>(null),
         cooperativeContribution: new FormControl<number>(null),
         firstAdvance: new FormControl<number>(null),
         secondAdvance: new FormControl<number>(null),
         transportationBonus: new FormControl<number>(null),
      });
   }
   
   static getDefaultPercentageLiquidationFormGroup(): FormGroup {
      return new FormGroup({
         loadId: new FormControl<number>(null, [Validators.required]),
         supplierId: new FormControl<number>(null, [Validators.required]),
         admissionDate: new FormControl<string>('', [Validators.required]),
         liquidationDate: new FormControl<string>('', [Validators.required]),
         exchangeRate: new FormControl<number>(null, [Validators.required]),
         quotation: new FormControl<number>(null, [Validators.required]),
         percentage: new FormControl<number>(null, [Validators.required]),
         dmSilver: new FormControl<number>(null, [Validators.required]),
         humidityPercentage: new FormControl<number>(null, [Validators.required]),
         metricWetKilograms: new FormControl<number>(null, [Validators.required]),
         cajaNacional: new FormControl<number>(null),
         fedecomin: new FormControl<number>(null),
         fencomin: new FormControl<number>(null),
         comibol: new FormControl<number>(null),
         miningRoyalties: new FormControl<number>(null),
         firstAdvance: new FormControl<number>(null),
         transportationBonus: new FormControl<number>(null),
      });
   }
}
