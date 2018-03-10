import { Component, OnInit } from '@angular/core';

// Services
import { AppService } from "../../services/app.service";

// Models
import { PageConfigDto } from '../../models/page-config-dto';

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
        var pageConfig = new PageConfigDto({ Name: 'home', Title: 'Apps Home' });
        this.appSvc.setPageConfig(pageConfig);
    }

}
