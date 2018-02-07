import { Component, OnInit } from '@angular/core';

// Services
import { AppService } from "../../services/app.service";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

    //-----------------
    // Constuctor
    //-----------------

    constructor(
        private appSvc: AppService) {
    }

    //-----------------
    //    Methods
    //-----------------
    ngOnInit() {
        this.appSvc.setTitle('Weather');
    }

}
