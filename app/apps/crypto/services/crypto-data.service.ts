import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoDataService {

    result: any;

    constructor(private _http: HttpClient) { }


    getCoins() {
        return this._http.get("https://min-api.cryptocompare.com/data/all/coinlist")
            .map(result => this.result = result);
    }

    getPrices() {
        return this._http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD")
            .map(result => this.result = result);
    }

}