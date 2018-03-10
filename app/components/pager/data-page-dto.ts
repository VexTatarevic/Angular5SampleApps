
/**
 * Data Transfer Object for paging of data on the client-side
 * NOTE: Use only for client-side paging, when you are storing all serverside data into Data property and wish to get a page data subset from it
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class DataPageDto {

    //-----------------
    // Properties
    //-----------------


    /** Current page number */
    PageNumber: number = 1;

    /** Number of records per page */
    Size: number = 10;

    Total: number;

    /** Number of page links visible in the user interface */
    PagesToShow: number = 3;

    /** All data returned from the server */
    AllData: any[] = [];

    /** Subset of AllData containing only data for the currently selected page */
    Data: any[] = [];


    //-----------------
    // Constructor
    //-----------------

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    //-----------------
    //    Methods
    //-----------------
    

    /**
     * Client-side paging : Calculates data subset of AllData for the current page
     *
     * @param  pageNumber       - number of the page for which we want to display data
     * @param  storePageData    - if set to true, page data will be stored in Data property of this object
     */
    getPageData(pageNumber: number = null, storePageData: boolean = false): any[] {
        if (pageNumber) this.PageNumber = pageNumber;     
        this.PageNumber = this.PageNumber || 1;
       
        var total = this.Total = this.AllData.length;
        var pageSize = this.Size;

        //------------------- Set Page Data -----------------------
        var skip = (this.PageNumber - 1) * pageSize;
        if (skip > total) {
            this.PageNumber =  Math.ceil(this.Total / this.Size) || 1;
            skip = (this.PageNumber - 1) * pageSize;
        }
        var end = skip + pageSize;
        end = (end < total ? end : total);
        var data = this.AllData.slice(skip, end);
        if (storePageData) {
            this.Data = data;
        }
        return data;
    }
    /**
     * Client-side paging : Calculates subset of AllData for current page and assigns it to the Data property
     * Calls getPageData 
     * @param pageNumber - if not provided Number property will be used. If it is null, the page number will default to 1.
     */
    setPageData(pageNumber: number = null): void {
        this.getPageData(pageNumber, true);
    }


}
