

import { Component, OnInit, Input } from '@angular/core';

// Models
import { LoadingOverlayDto } from "../../models/loading-overlay-dto";

@Component({
    selector: 'loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.css']
})
/**
 * Component for display of loading indicator for example when api calls to the server are in progress
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class LoadingOverlayComponent implements OnInit {

    @Input() overlay: LoadingOverlayDto;

    constructor() { }

    ngOnInit() {
    }

}
