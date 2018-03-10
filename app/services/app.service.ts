

import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Router } from '@angular/router';

// Models
import { LoadingOverlayDto } from "../models/loading-overlay-dto";
import { PageConfigDto } from "../models/page-config-dto";


@Injectable()
/**
 * Service for generic application wide tasks like :
 * displaying loading overlay, setting current page configuration, navigating to previous page etc.
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class AppService {


    //-------------------
    //  Constructor
    //----------------------
    constructor(
        private router: Router) { }


    //-------------------
    //  Observables
    //----------------------


    // Get Set Loading Overlay display
    private loadingOverlayObs$ = new Subject();
    getLoadingOverlay() { return this.loadingOverlayObs$; }
    // input can be one of following types:
    //      string              - loading overlay text to display
    //      boolean             - show/hide loading overlay. Since text is not provided , the default text will be used
    //      LoadingOverlayModel - 
    setLoadingOverlay(input: any) { this.loadingOverlayObs$.next(input); }

    // Get Set App Page Config
    private pageConfigObs$ = new Subject<PageConfigDto>();
    getPageConfig() { return this.pageConfigObs$; }
    /**
     * Set page configuration observable in app service so that parent components subscribed to it receive the page update
     * @param input
     */
    setPageConfig(input: PageConfigDto) { this.pageConfigObs$.next(input); }



    //-------------------
    //  Common
    //----------------------

    /**
    * Navigate back to master page
    * @param clearSelectedItem
    */
    navigateBack(pageConfig: PageConfigDto) {       
        // Navigate back to master page       
        this.router.navigateByUrl(pageConfig.NavBackUrl);
    }


}
