
/**
*  Object containing data for one crypto coin
*
* @author Vex Tatarevic 2018-02-08
* @class
*/
export class CoinDto {
    Id: string; // int
    Algorithm: string;
    CoinName: string;
    FullName: string;
    FullyPremined: string; // int bool
    ImageUrl: string;
    Name: string;
    PreMinedValue: string;
    ProofType: string;
    SortOrder: string; // int
    Sponsored: boolean;
    Symbol: string;
    TotalCoinSupply: string; // int
    TotalCoinsFreeFloat: string;
    Url: string;

    BaseSymbol: string;
    BasePrice: number; // decimal

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}