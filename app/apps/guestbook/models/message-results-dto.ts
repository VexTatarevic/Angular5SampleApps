
import { MessageDto } from './message-dto';

/**
 * Data transfer object used to return paged results from message api call
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class MessageResultsDto {

    /** Current page number */
    Page: number;

    /** Number of records per page */
    Size: number;

    /** Total number of records */
    Total: number;

    /** Data Records returned for the given search */
    Data: MessageDto[];
}
