import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class AppService {

    //-------------------
    //  Global Properties
    //----------------------

    public data = {
        cryptos: [],
        selectedCrypto:null
    };

    //-------------------
    //  Observables
    //----------------------
    constructor() { }


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

    // Get Set App Title
    private titleObs$ = new Subject();
    getTitle() { return this.titleObs$; }
    setTitle(title: string) { this.titleObs$.next(title); }

}
