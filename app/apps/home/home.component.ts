import { Component, OnInit } from '@angular/core';

// Services
import { AppService } from "../../services/app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    //-----------------
    //    Constructor
    //-----------------
    constructor(
        private appSvc: AppService) { }


    //-----------------
    //    Methods
    //-----------------

    ngOnInit() {

        // Set page title
        this.appSvc.setTitle('Apps Home');
    }

}
