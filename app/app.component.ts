import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Services
import { AppService } from "./services/app.service";

// Models
import { LoadingOverlayModel } from "./models/loading-overlay-model";


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    //------------------
    //      Properties
    //------------------

    title = '';
    page = 'home';
    loadingOverlayModel: LoadingOverlayModel = { show: false, text: '' };

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
                    this.loadingOverlayModel = { show: true, text: input };
                else if (typeof input == 'boolean')
                    this.loadingOverlayModel = { show: input, text: 'Loading ...' };
                else if (typeof input == 'object')
                    this.loadingOverlayModel = input as LoadingOverlayModel;
            });
        });

        // listen for page change and change page Title
        this.svc.getTitle().subscribe(title => {
            setTimeout(() => {
                //this.titleService.setTitle(title as string);
                this.title = title as string;
            });
        });
    }

    onMenuItemClick(event, page) {
        setTimeout(() => {
            this.page = page;
            console.log(this.page);
        });
    }

}
