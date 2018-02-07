import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Services
import { AppService } from "../../services/app.service";
import { CryptoDataService } from './services/crypto-data.service';

@Component({
    selector: 'app-crypto',
    templateUrl: './crypto.component.html',
    styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {


    //-----------------
    // Properties
    //-----------------
   

    data: Array<object> = [];
    pageData: Array<object> = [];

    pager_pageNumber = 1;
    pager_totalRecords = 0;
    pager_pageSize = 20;

    baseImageUrl: string;
    baseLinkUrl: string;


    //-----------------
    // Constuctor
    //-----------------

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appSvc: AppService,
        private dataSvc: CryptoDataService) {
    }

    //-----------------
    //    Methods
    //-----------------

    ngOnInit() {

        this.appSvc.setTitle('Crypto');

        this.loadData();
    }

    onPageSizeChange(newSize) {
        this.pager_pageSize = newSize;
        this.setPageData();
    }

    onDataItemSelected(item) {
        //this.router.navigateByUrl('/crypto');

        this.appSvc.data.selectedCrypto = item;
        this.router.navigate(['/crypto', item.Symbol]);
    }


    /**
     * Load data from server or fro cached global variable
     */
    loadData(): void {

        // get global crypto data from app service
        this.data = this.appSvc.data.cryptos;

        // load cached
        if (this.data.length > 0)
            this.setPageData();
            // load from server
        else {
            this.appSvc.setLoadingOverlay('Loading crypto currencies ...');

            // Call Data Service
            this.dataSvc.getCoins()
                .subscribe(r => {

                    this.baseImageUrl = r['BaseImageUrl'];
                    this.baseLinkUrl = r['BaseLinkUrl'];
                    var d = r['Data'];

                    // fill local data array
                    for (var key in d) {
                        var crypto = d[key];
                        crypto.ImageUrl = this.baseImageUrl + crypto.ImageUrl;
                        crypto.Url = this.baseLinkUrl + crypto.Url;
                        this.data.push(crypto);
                    }

                    // set global crypto data in AppService
                    this.appSvc.data.cryptos = this.data;

                    // set page data
                    setTimeout(() => {
                        this.setPageData();
                    });
                }
                , () => { this.appSvc.setLoadingOverlay(false); }
                , () => { this.appSvc.setLoadingOverlay(false); }
                );
        }
    }

    /**
     * Get a subset of total data and display it on the page
     */
    setPageData() {
        this.pager_totalRecords = this.data.length;
        var data = this.data;
        var pageNumber = this.pager_pageNumber;
        var pageSize = this.pager_pageSize;
        var totalRecords = this.pager_totalRecords;
        //------------------------------------------
        var skip = (pageNumber - 1) * pageSize;
        var take = pageSize;
        var end = skip + take;
        end = (end < totalRecords ? end : totalRecords);
        this.pageData = data.slice(skip, end);
        console.log('load page: ' + pageNumber);
    }


    //----------------------
    //  Pager Events
    //----------------------

    pager_goToPage(n: number): void {
        this.pager_pageNumber = n;
        this.setPageData();
    }

    pager_onNext(): void {
        this.pager_pageNumber++;
        this.setPageData();
    }

    pager_onPrev(): void {
        this.pager_pageNumber--;
        this.setPageData();
    }



}
