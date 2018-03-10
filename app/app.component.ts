import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Services
import { AppService } from "./services/app.service";

// Models
import { LoadingOverlayDto } from "./models/loading-overlay-dto";
import { PageConfigDto } from "./models/page-config-dto";


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    //------------------
    //      Properties
    //------------------

   
    page: PageConfigDto = new PageConfigDto();
    loadingOverlay: LoadingOverlayDto = { show: false, text: '' };

    //-----------------
    // Constuctor
    //-----------------
    constructor(
        private titleService: Title,
        private svc: AppService) {
    }

    //------------------
    //      Methods
    //------------------

    // On Init Event
    ngOnInit() {
        

        // Listen for loading status change and show or hide Loading indicator
        this.svc.getLoadingOverlay().subscribe(input => {
            setTimeout(() => {
                if (typeof input == 'string')
                    this.loadingOverlay = { show: true, text: input };
                else if (typeof input == 'boolean')
                    this.loadingOverlay = { show: input, text: 'Loading ...' };
                else if (typeof input == 'object')
                    this.loadingOverlay = input as LoadingOverlayDto;
            });
        });

        // listen for page change and change page Title
        this.svc.getPageConfig().subscribe(page => {
            setTimeout(() => {
                this.page = page;
            });
        });
    }

    onMenuItemClick(event, pageName) {
        setTimeout(() => {
            this.page.Name = pageName;
        });
    }

    onNavBack() {
        this.svc.navigateBack(this.page);
    }

}
