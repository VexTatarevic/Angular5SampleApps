/**
 * Object containing current pafge configuration. Passed to app module via app service.
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class PageConfigDto {
    Name: string;           // name that identifies the page
    Title: string;          // display title
    Level: number = 1;      // hierarchy level in navigation. Default = 1
    NavBackUrl: string;     // url to navigate when page back button is clicked. Used for pages with Level > 1 

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}