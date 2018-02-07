/**
 * Object containing data for one crypto currency
 * @class
 */
export class CryptoModel {
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
}