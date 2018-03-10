import { Component, OnInit } from '@angular/core';

// Services
import { AppService } from "../../services/app.service";
import { MoviesDataService } from "./services/movies-data.service";

// Models
import { PageConfigDto } from '../../models/page-config-dto';
import { MovieModel } from "./models/movie-model";

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
 /**
 * Main component for Movies app
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class MoviesComponent implements OnInit {


    //-----------------
    // Properties
    //-----------------

    error = '';
    searchTerm = '';
    movie = new MovieModel();

    //-----------------
    // Constructor
    //-----------------

    constructor(
        private appSvc: AppService,
        private dataSvc: MoviesDataService) {
    }

    //-----------------
    //    Methods
    //-----------------

    ngOnInit() {
        var pageConfig = new PageConfigDto({ Name: 'movies', Title: 'Movies' });
        this.appSvc.setPageConfig(pageConfig);
    }

    onSearchChange() {
        this.appSvc.setLoadingOverlay('Searching movies database ...');
        // Call Data Service to fetch the movie details
        this.dataSvc.findMovie(this.searchTerm)
            .subscribe(
            r => {
                this.error = r['Error'];
                this.movie = r as MovieModel;
                this.searchTerm = '';
            }
            , error => {
                this.appSvc.setLoadingOverlay(false); 
                console.log('Error. The findMovie result JSON value is as follows:');
                console.log(error);
            }
            , () => { this.appSvc.setLoadingOverlay(false); });
    }




}
