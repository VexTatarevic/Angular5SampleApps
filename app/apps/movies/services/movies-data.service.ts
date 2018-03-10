
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
 /**
 * Service for management of data related to Movies app
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class MoviesDataService {

    //-----------------
    // Properties
    //-----------------

    findMovieURL1 = 'http://www.omdbapi.com/?apikey=13452a14&t=';
    findMovieURL2 = '&y=&plot=short&r=json';

    //-----------------
    // Constructor
    //-----------------

    constructor(
        private _http: HttpClient) { }
    
    //-----------------
    //    Methods
    //-----------------

    findMovie(movie) {
        return this._http.get(this.findMovieURL1 + movie + this.findMovieURL2)
            .map(r => {
                return r;
            })
            .catch(error => Observable.throw(error.json().error));
    }
}
