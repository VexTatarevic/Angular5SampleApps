import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { PageConfigDto } from "../../../../models/page-config-dto";
import { CoinDto } from "../../models/coin-dto";

// Services
import { AppService } from "../../../../services/app.service";
import { CryptoDataService } from '../../services/crypto-data.service';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
 /**
 * Component for details page in crypto app, that displays details for selected crypto coin
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class CryptoDetailsComponent implements OnInit {

    pageConfig = new PageConfigDto();
    item = new CoinDto();

    constructor(
        private appSvc: AppService,
        private data: CryptoDataService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Set up page configuration
        this.pageConfig = new PageConfigDto({ Name: 'crypto-details', Title: 'Crypto Details', Level: 2, NavBackUrl: '/crypto' });
        this.appSvc.setPageConfig(this.pageConfig);
        this.item = this.data.coinSelected;
    }

}
