import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

// Services
import { AppService } from "../../services/app.service";
import { GuestbookDataService } from "./services/guestbook-data.service";

// Models
import { PageConfigDto } from '../../models/page-config-dto';
import { CategoryDto } from "./models/category-dto";
import { MessageDto } from "./models/message-dto";
import { MessageSearchDto } from './models/message-search-dto';


@Component({
    selector: 'app-guestbook',
    templateUrl: './guestbook.component.html',
    styleUrls: ['./guestbook.component.css']
})
 /**
 * Main component for Guestbook app
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class GuestbookComponent implements OnInit {


    //---------------------
    //  Properties
    //---------------------




    //---------------------
    //  Constructor
    //---------------------
    constructor(
        private appSvc: AppService,
        private router: Router,
        public data: GuestbookDataService // expose data service to interface so that data can be accessed from template
    ) { }


    //---------------------
    //  Methods
    //---------------------

    ngOnInit() {
        var pageConfig = new PageConfigDto({ Name: 'guestbook', Title: 'Guestbook' });
        this.appSvc.setPageConfig(pageConfig);
        this.loadData();
    }

    /**
     * Load all the data
     */
    loadData(): void {

        // Load Categories
        if (this.data.categories == null) {
            this.getAllCategories();
        }

        // Load Message Results
        if (this.data.messageSearch == null || this.data.messageSearch.Reload) {

            // if this is a first search, initialize the search object
            if (this.data.messageSearch == null) {
                this.data.messageSearch = new MessageSearchDto();
                this.data.messageSearch.setDefaults();
            }

            else // If this is a reload, then reset reload flag
                this.data.messageSearch.Reload = false;

            this.getMessageResults();
        }
    }

    /**
     * Set counts of number of messages in each category
     */
    setCategoryCounts() {
        //var count = 0;
        //for (var i = 0; i < this.data.messages.length; ++i) {
        //    var catId = this.data.messages[i].CategoryId;
        //    var count = this.data.categoryCounts[catId];
        //    if (count)
        //        this.data.categoryCounts[catId]++;
        //    else
        //        this.data.categoryCounts[catId] = 1;
        //}
    }


    //------------------  Categories ------------------


    onCategoryChange(categoryId : number) {
        this.data.messageSearch.Cat = categoryId;
        var _self = this;
        this.getMessageResults(function () {
            // hide serach panel after results have been received
            _self.data.messageSearch.IsVisible = false;
        });
    }

    getAllCategories() {
        this.data
            .getAllCategories()
            .subscribe(r => {
                this.data.categories.unshift(new CategoryDto({ Id: '', Name: 'All Categories' }));
            });
    }

    //------------------  Messages ------------------

    getMessageResults(onSuccess: any = null) {
        this.appSvc.setLoadingOverlay('Loading messages ...');
        this.data
            .getMessages()
            .subscribe(r => {
                if (onSuccess!=null)
                    onSuccess();
            }
            , () => { this.appSvc.setLoadingOverlay(false); }
            , () => { this.appSvc.setLoadingOverlay(false); }
            );
    }

    onToggleSearchClick() {
        this.data.messageSearch.IsVisible = !this.data.messageSearch.IsVisible;
    }

    onMessageAddClick() {
        this.data.messageSelected = null;
        this.router.navigateByUrl('/guestbook/message');
    }

    onSortDescToggleClick(isDescending:boolean) {
        this.data.messageSearch.Desc = isDescending;
        this.getMessageResults();
    }

    onSortChange(sortField: string) {
        this.data.messageSearch.SortBy = sortField;
        this.getMessageResults();
    }


    /**
     *  On Message selected navigate to mesage details page using navigation router from app-routing.module
     * @param item
     */
    onMessageSelect(item: MessageDto) {
        this.data.messageSelected = item;
        this.router.navigate(['/guestbook/message/', item.Id]);
    }



    //onMessageRemove(e: MessageDto) {
    //    this.data
    //        .deleteMessage(e.Id)
    //        .subscribe(
    //        r => {
    //            this.data.messages = this.data.messages.filter((item) => item.Id !== e.Id);
    //        }
    //        );
    //}

    //----------------------
    //  Message Pager Events
    //----------------------

    onPageChange(pageNumber: number): void {
        this.data.messageSearch.Page = pageNumber;
        this.getMessageResults();
    }

    onPageSizeChange(newSize: string) {
        this.data.messageSearch.Size = parseInt(newSize);
        this.getMessageResults();
    }

}
