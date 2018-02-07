import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { CryptoModel } from "../../models/crypto-model";

// Services
import { AppService } from "../../../../services/app.service";

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
export class CryptoDetailsComponent implements OnInit {

    item = new CryptoModel();

    constructor(
        private appSvc: AppService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.appSvc.setTitle('Crypto Details');
        this.item = this.appSvc.data.selectedCrypto;
    }

}
