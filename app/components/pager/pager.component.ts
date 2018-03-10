
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css']
})
/**
 * Component for data pagination
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class PagerComponent implements OnInit {

    //-----------------
    // Properties
    //-----------------
    /** Current page number */
    @Input() page: number;          

    /** number of total items on all the pages */
    @Input() totalItems: number; 

    /**  maximum number of items displayed on one page */
    @Input() itemsPerPage: number; 

    /** number of page links displayed on the pager */
    @Input() pagesToShow: number; 

    /** Status of data loading. If true, it allows pages to be disabled so that user doesn't trigger another load request */
    @Input() loading: boolean;    

    /** Event triggered on change of the page, either when user clicks one of the links: page number, first, previous, next or last */
    @Output() onPageChange = new EventEmitter<number>();


    

    //-----------------
    // Constuctor
    //-----------------

    constructor() { }

    //-----------------
    //    Methods
    //-----------------

    ngOnInit() {
    }
    /*
     *  This is used in client side paging
        You must call your server side api in ngAfterViewInit and pass this function inside onSuccess callback

        @ViewChild(PagerComponent) pager:PagerComponent;
        ngAfterViewInit() {
            var self = this;
            var onSuccess = function(data){
                self.pager.load(data);
            }
            var data = getAllData(onSuccess);
        }
     * 
    
    public load(data: any[]):void {
        this.data = data;
        this.setPageData();
    }
 */
   

    

    getMin(): number {
        return ((this.itemsPerPage * this.page) - this.itemsPerPage) + 1;
    }

    getMax(): number {
        let max = this.itemsPerPage * this.page;
        if (max > this.totalItems) {
            max = this.totalItems;
        }
        return max;
    }


    //------------------------
    //      Emitter Methods


    onFirst(): void {
        this.page = 1;
        this.onPageChange.emit(this.page);
    }

    onPrev(): void {
        this.page--;
        this.onPageChange.emit(this.page);
    }

    onPage(pageNumber: number): void {
        // only emit onPageChange event if the page has actually changed
        if (this.page != pageNumber) {
            this.page = pageNumber;
            this.onPageChange.emit(this.page);
        }
    }

    onNext(): void {
        this.page++;
        this.onPageChange.emit(this.page);
    }

    onLast(): void {
        this.page = this.totalPages();
        this.onPageChange.emit(this.page);
    }



    totalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage) || 0;
    }

    isLastPage(): boolean {
        // (this.itemsPerPage * this.page) >= this.totalItems;
        return (this.page == this.totalPages());
    }

    getPages(): number[] {

        const c = Math.ceil(this.totalItems / this.itemsPerPage);

        const p = this.page || 1;

        const pagesToShow = this.pagesToShow || 9;

        const pages: number[] = [];

        pages.push(p);

        const times = pagesToShow - 1;

        for (let i = 0; i < times; i++) {

            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }

            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }

        pages.sort((a, b) => a - b);

        return pages;
    }

}

