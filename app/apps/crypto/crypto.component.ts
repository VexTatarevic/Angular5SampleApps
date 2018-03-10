import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Services
import { AppService } from "../../services/app.service";
import { CryptoDataService } from './services/crypto-data.service';

// Models
import { PageConfigDto } from '../../models/page-config-dto';
import { CoinDto } from './models/coin-dto';
import { CurrencyDto } from './models/currency-dto';
import { DataPageDto } from '../../components/pager/data-page-dto';

@Component({
    selector: 'app-crypto',
    templateUrl: './crypto.component.html',
    styleUrls: ['./crypto.component.css']
})
 /**
 * Main component for crypto app
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class CryptoComponent implements OnInit {


    //-----------------
    // Properties
    //-----------------




    //-----------------
    // Constructor
    //-----------------

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appSvc: AppService,
        public data: CryptoDataService  // expose data service to interface so that data can be accessed from template
    ) {
    }

    //-----------------
    //    Methods
    //-----------------

    ngOnInit() {
        // init page configuration
        var pageConfig = new PageConfigDto({ Name: 'crypto', Title: 'Crypto' });

        // init app service
        this.appSvc.setPageConfig(pageConfig);

        // init coin DataPage object
        this.data.coinDataPage = new DataPageDto({ PageNumber: 1, Size: 5, PagesToShow: 3 });


        this.loadData();

    }


    loadData(): void {
        if (this.data.currencies == null) {
            this.loadCurrencies();
        }
        if (this.data.coinDataPage.AllData == null || this.data.coinDataPage.AllData.length == 0) {
            this.loadCoins();
        }
    }

    loadCurrencies(): void {
        this.appSvc.setLoadingOverlay('Loading base currency list ...');
        this.data.getCurrencies();
        setTimeout(() => {
            //this.data.currencies.unshift(new CurrencyDto({ code: '', name: '-- Select Base Currency --' }));
            this.data.currencySelected = this.data.currencies.filter(c => {
                return (c.code == 'AUD');
            })[0];
        });

        this.appSvc.setLoadingOverlay(false);
    }

    /**
     * Load data from server
     */
    loadCoins(): void {
        this.appSvc.setLoadingOverlay('Loading crypto currency coins ...');
        this.data
            .getAllCoins()
            .subscribe(r => {
                // set page data - must put a delay otherwise the ui is not rendered
                setTimeout(() => {
                    this.data.coinDataPage.setPageData();
                    this.loadPrices();
                });
            }
            , () => { this.appSvc.setLoadingOverlay(false); }
            , () => { this.appSvc.setLoadingOverlay(false); }
            );
    }

    loadPrices(): void {
        var currency: CurrencyDto = this.data.currencySelected;
        this.appSvc.setLoadingOverlay('Loading prices ...');
        this.data
            .getPrices(currency)
            .subscribe(r => {
               
            }
            , () => { this.appSvc.setLoadingOverlay(false); }
            , () => { this.appSvc.setLoadingOverlay(false); }
            );
    }

    onBaseCurrencyChange(currency: CurrencyDto) {
        this.data.currencySelected = currency;
        this.loadPrices();
    }

    onPageSizeChange(newSize: string) {
        // set page size and cache it
        this.data.coinDataPage.Size = parseInt(newSize);
        this.data.coinDataPage.setPageData();
        this.loadPrices();
    }

    onPageChange(pageNumber: number): void {
        this.data.coinDataPage.setPageData(pageNumber);
        this.loadPrices();
    }

    onDataItemSelected(item: CoinDto) {
        this.data.coinSelected = item;
        this.router.navigate(['/crypto', item.Symbol]);
    }



}
