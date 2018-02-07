import { Component, OnInit } from '@angular/core';

// Services
import { AppService } from "../../services/app.service";

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

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
        this.appSvc.setTitle('Movies');
    }

}
