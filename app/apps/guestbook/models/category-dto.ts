
 /**
 * Object containing data for Guestbook message category
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class CategoryDto {

    Id: number;
    Name: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
