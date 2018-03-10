/**
 * Data transfer object used to pass search parameters to message api call
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class MessageSearchDto {

    /** Current page number */
    Page: number;

    /** Number of records per page */
    Size: number;

    /** Name of the field by which records are ordered */
    SortBy: string;

    /** True means Sort in Descending order. False : sort in Ascending order */
    Desc: boolean;

    /** CategoryId */
    Cat: any;

    /** Sender Name */
    Sender: string;

    /** Sender Email */
    Email: string;

    /** Message Subject */
    Subject: string;

    /** Has message been read */
    Read: boolean;

    /**
     * string in iso format e.g. 2018-02-27
     * Date From - return messages sent from and including this date
     */
    From: string;

    /**
     * string in iso format e.g. 2018-02-27
     * Date To - return messages sent to and including this date
     */
    To: string;

    /** If set to true the controller will call api for this search again */
    Reload: boolean;


    /** If set to true the search panel will be visible */
    IsVisible: boolean;


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    /**
     * Reset model values to default values
     */
    setDefaults() {
        this.Page = 1;
        this.Size = 5;
        this.SortBy = 'DateSent';
        this.Desc = true;
        this.Cat = '';
    }

    /**
     * Returns url query string that includes parameters provided in this search dto object
     */
    getQueryString() {
        var queryString =
            (this.Page ? 'page=' + this.Page + '&' : '') +
            (this.Size ? 'size=' + this.Size + '&' : '') +
            (this.SortBy ? 'sortby=' + this.SortBy + '&' : '') +
            (this.Desc ? 'desc=' + this.Desc + '&' : '') +
            (this.Cat ? 'cat=' + this.Cat + '&' : '') +
            (this.Sender ? 'sender=' + this.Sender + '&' : '') +
            (this.Email ? 'email=' + this.Email + '&' : '') +
            (this.Subject ? 'subject=' + this.Subject + '&' : '') +
            (this.Read ? 'read=' + this.Read + '&' : '') +
            (this.From ? 'from=' + this.From + '&' : '') +
            (this.To ? 'to=' + this.To + '&' : '');
        return (queryString ? '?' + queryString.slice(0, -1) : '');
    }
}
