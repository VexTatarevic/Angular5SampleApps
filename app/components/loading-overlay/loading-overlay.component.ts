import { Component, OnInit, Input } from '@angular/core';

// Models
import { LoadingOverlayModel } from "../../models/loading-overlay-model";

@Component({
    selector: 'loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent implements OnInit {

    @Input() overlay: LoadingOverlayModel;

    constructor() { }

    ngOnInit() {
    }

}
