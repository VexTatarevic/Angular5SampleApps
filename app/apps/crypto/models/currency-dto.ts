 /**
 * Object containing data for base currency
 *
 * @author Vex Tatarevic 2018-03-09
 * @class
 */
export class CurrencyDto {

    symbol: string ='';
    name: string = '';
    symbol_native: string = '';
    decimal_digits = 0;
    rounding = 0;
    code:string = '';
    name_plural: string = '';


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}