/**
 * Object containing data for Guestbook message
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class MessageDto {

    Id: number;
    Name: string = '';
    Email: string = '';
    Subject: string = '';
    Text: string = '';
    DateSent: string = '';
    DateRead: string = '';
    IsRead: boolean = false;
    CategoryId: number = 0;
    CategoryName: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
