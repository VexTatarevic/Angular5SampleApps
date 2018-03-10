import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// models
import { CategoryDto } from '../models/category-dto';
import { MessageDto } from '../models/message-dto';
import { MessageResultsDto } from '../models/message-results-dto';
import { MessageSearchDto } from '../models/message-search-dto';

// Environment Config File
import { environment } from '../../../../environments/environment';


@Injectable()
 /**
 * Service for management of data related to Guestbook app
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class GuestbookDataService {

    //------------------
    //    Properties
    //------------------
    private API_URL = environment.apiUrl_Vexit_Guestbook();
    private apiCategories: string = this.API_URL + 'categories';
    private apiMessages: string = this.API_URL + 'messages';
    private apiMessagesInCategory: string = this.API_URL + 'category/{category}/messages';
    

    messageSearch: MessageSearchDto = null;
    messageResults: MessageResultsDto = null;
    messageSelected: MessageDto = null;

    categories: CategoryDto[] = null;
    categoryCounts: number[] = [];

    //------------------
    //    Constructor
    //------------------

    constructor(
        private http: HttpClient) { }


    //------------------
    //    Methods
    //------------------

    //------------------  Categories ------------------


    getCategoryCssClass(categoryId: number) {
        switch (categoryId) {
            case 1: return 'text-secondary';
            case 2: return 'text-warning';
            case 3: return 'text-primary';
            case 4: return 'text-success';
            case 5: return 'text-danger';
            default:
        }
    }

    // API: GET /[entity]
    getAllCategories(): Observable<CategoryDto[]> {
        
        return this.http
            .get(this.apiCategories)
            .map(r => {
                this.categories = r as CategoryDto[];
            })
            .catch(this.handleError);
    }

    

    //------------------  Messages ------------------


    
    /**
     * Get paged list of messages by passing in MessageSearchDto
     */
    getMessages(): Observable<MessageResultsDto> {
        var url = this.apiMessages + this.messageSearch.getQueryString();
        return this.http
            .get(url)
            .map(r => {
                // map response to messageResults Data
                this.messageResults = (r as MessageResultsDto);
                this.messageResults.Data.map((m) => {                   
                    // map category name from categories to MessageDto
                    if (this.categories && this.categories.length > 0) {
                        var cat = this.categories.filter(c => {
                            return (c.Id == m.CategoryId);
                        })[0];
                        m.CategoryName = cat.Name;
                    }
                });
                return this.messageResults;
            })
            .catch(this.handleError);
    } 

    // API: GET /[entity]/:id
    getMessage(id: number): Observable<MessageDto> {
        return this.http
            .get(this.apiMessages + '/' + id)
            .map(r => {
                return new MessageDto(r);
            })
            .catch(this.handleError);
    }

    // API: POST /[entity]
    createMessage(e: MessageDto): Observable<MessageDto> {
        return this.http
            .post(this.apiMessages, e)
            .map(r => {
                return new MessageDto(r);
            })
            .catch(this.handleError);
    }

    // API: PUT /[entity]/:id
    updateMessage(e: MessageDto): Observable<MessageDto> {
        return this.http
            .put(this.apiMessages + '/' + e.Id, e)
            .map(r => {
                return new MessageDto(r);
            })
            .catch(this.handleError);
    }

    // DELETE /[entity]/:id
    deleteMessage(id: number) {
        return this.http
            .delete(this.apiMessages + '/' + id)
            .map(response => null)
            .catch(this.handleError);
    }
    

    // Toggle message read flag
    //toggleMessageRead(e: MessageDto) {
    //    e.read = !e.read;
    //    return this.update(e);
    //}


    //-------------------------------
    //  Utility Methods
    //---------------------------------


    handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }


}
