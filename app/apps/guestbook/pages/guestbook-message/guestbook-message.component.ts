import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

// Services
import { FormService } from "../../../../services/form.service";
import { AppService } from "../../../../services/app.service";
import { GuestbookDataService } from "../../services/guestbook-data.service";

// Models
import { PageConfigDto } from "../../../../models/page-config-dto";
import { CategoryDto } from "../../models/category-dto";
import { MessageDto } from "../../models/message-dto";
import { MessageSearchDto } from '../../models/message-search-dto';

@Component({
    selector: 'app-guestbook-message',
    templateUrl: './guestbook-message.component.html',
    styleUrls: ['./guestbook-message.component.css']
})
 /**
 * Component for details page in Guestbook app, that displays details for selected guestbook message
 *
 * @author Vex Tatarevic 2018-02-08
 * @class
 */
export class GuestbookMessageComponent implements OnInit {

    //---------------------
    //  Properties
    //---------------------
    private page: PageConfigDto;
    item: MessageDto;
    form: FormGroup;
    isActionInProgress: boolean = false;
    serverErrors: any; // validation or other errors received from server after api call has been made
    private frmSvc: FormService;   
    private validationMessages = {
        Name: {
            required: 'Please enter your Name.',
            minlength: 'The Name must be longer than 2 characters.'
        },
        Email: {
            required: 'Please enter your email address.',
            pattern: 'Please enter a valid email address.',
            minlength: 'Please enter at least 4 characters.'
        },
        Subject: {
            required: 'Please enter message subject.',
            minlength: 'The Subject must be longer than 3 characters.'
        },
        Text: {
            required: 'Please enter your message.',
            minlength: 'Message must be longer than 5 characters.'
        },
        CategoryId: {
            required: 'Please select message Category.'
        },
    };
    private progressMessages = {
        creatingMessage: 'Adding new message ...',
        loadingMessage: 'Loading message ...',
        updatingMessage: 'Saving message ...',
        deletingMessage: 'Deleting message ...',
    };

    SubjectErrors:string;
    CategoryIdErrors: string;
    NameErrors: string;
    EmailErrors: string;
    TextErrors: string;

    //---------------------
    //  Constructor
    //---------------------
    constructor(
        private fb: FormBuilder,
        private appSvc: AppService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public data: GuestbookDataService) { }


    //-----------------------------------------------------------
    //  Methods
    //-----------------------------------------------------------



    //------------
    //  Events
    //------------

    ngOnInit() {

        //-------------------------
        //    Init Page Config
        //-------------------------
        this.page = new PageConfigDto({ Name: 'guestbook-message', Title: 'Message', Level: 2, NavBackUrl: '/guestbook' });
        this.appSvc.setPageConfig(this.page);

        //----------------------------
        //    Init Data Model (Item)
        //----------------------------

        // Check if item has been selected on previous page and asign it as a current item to edit
        if (this.data.messageSelected != null) {
            this.item = this.data.messageSelected;

            // If item not selected on previous page
        } else {
            // initialize empty item
            this.item = new MessageDto();
            // if item id is provided in the url, then select that item from database and load it
            this.activatedRoute.params.subscribe(params => { this.loadItemById(params['id']); });
        }

        //-------------------------
        //    Init Form Controls
        //-------------------------
        this.form = this.fb.group({
            Name:       ['', [  Validators.required,
                                Validators.minLength(3)
                             ]],
            Email:      ['', [
                                Validators.required,
                                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
                                Validators.minLength(4)
                            ]],
            Subject:    ['', [  Validators.required,
                                Validators.minLength(3)
                             ]],
            Text:       ['', [  Validators.required,
                                Validators.minLength(5)
                            ]],
            CategoryId: ['', [  Validators.required]]
        });

        //---------------------------------------
        //  Initialize reactive form service which automatically sets valueChanges watchers on all form controls
        //---------------------------------------
        this.frmSvc = new FormService(
            this as Component,
            this.form,
            this.validationMessages,
            { Email: {debounceTime: 1000 }}
        );        

        //---------------------
        //  Bind data to form if this is edit mode
        //---------------------
        if (this.item.Id) {
            this.frmSvc.bind(this.item);
        }
        
    }

    /** Cancel Editing message */
    onCancel() {
        this.navigateBack();
    }

    /** Create/Update Message */
    onSave() {
        // bind data from form to data model
        this.frmSvc.updateModel(this.item);

        // get component context for access on ajax success callback
        var component = this;


        // Update existing entity
        if (this.item.Id) {
            this.subscribe(
                this.progressMessages.updatingMessage,
                this.data.updateMessage(this.item),
                function () {
                    component.navigateBack();
                }
            );
        } else {
            // Create new entity
            this.subscribe(
                this.progressMessages.creatingMessage,
                this.data.createMessage(this.item),
                function (r) {
                    component.data.messageSelected = r;
                    component.data.messageSearch.setDefaults();
                    component.data.messageSearch.Reload = true;
                    component.navigateBack(true);
                }
            );
        }
    }

    /** Remove Message */
    onRemove() {
        // get component context for access on ajax success callback
        var component = this;
        this.subscribe(
            this.progressMessages.deletingMessage,
            this.data.deleteMessage(this.item.Id),
            function (r) {
                component.data.messageSearch.Reload = true;
                component.navigateBack(true);
            }
        );
    }

    /** Handles click on the closer button of the alert for server errors */
    onCloseServerErrorAlertClick() {
        this.serverErrors = null;
    }

    onCategoryChange(categoryId: number) {
        this.item.CategoryId = categoryId;
    }

    //-------------------------------
    //  Other Methods
    //---------------------------------

    

    /**
     * Load item from database by hitting api url
     * @param id
     */
    loadItemById(id) {
        if (id) {
            var self = this;
            this.subscribe(
                this.progressMessages.loadingMessage,
                this.data.getMessage(id),
                function (r) {
                    setTimeout(() => {
                        self.item = r;
                        self.frmSvc.bind(self.item);
                    });
                }
            );
        }
    }

    /**
     * Navigate back to master page
     * @param clearSelectedItem
     */
    navigateBack(clearSelectedItem: boolean = false) {
        if (clearSelectedItem)
            this.data.messageSelected = null;
        // Navigate back to master page       
        this.appSvc.navigateBack(this.page);
    }




    //-------------------------------
    //  Utility Methods
    //---------------------------------
    

    /**
     *  Reusable utility method for making a request
     * @param observable
     * @param loadingMessage
     * @param onSuccess
     */
    subscribe(
        loadingMessage: string,
        observable: Observable<any>,
        onSuccess: any) {


        this.appSvc.setLoadingOverlay(loadingMessage);

        this.isActionInProgress = true;

        observable
            .subscribe(r => {
                onSuccess(r);
            }
            , r => {
                // remove loading overlay
                this.appSvc.setLoadingOverlay(false);

                this.isActionInProgress = false;

                // print response to console
                console.log('Error ' + JSON.stringify(r));

                // if error property returned from server, parse it and assign to serverErrors variable to be printed in UI
                if (r.error) {
                    // init server errors array
                    this.serverErrors = [];

                    // handle error as string
                    if (typeof r.error == 'string') {
                        this.serverErrors.push([r.error]);

                        // handle error as key value pairs object with error message arrays as values
                    } else {
                        // Get all the error object keys.
                        let keys = Object.keys(r.error);
                        // Iterate through all keys.
                        for (var prop of keys) {
                            var errors = r.error[prop];
                            this.serverErrors.push(errors);
                        }
                    }
                }
            }
            , () => {
                this.appSvc.setLoadingOverlay(false);
                this.isActionInProgress = false;
                this.item = new MessageDto();
            });
    }

    //onToggleReadMessage(e) {
    //    this.data
    //        .toggleMessageRead(e)
    //        .subscribe(
    //        r => { e = r; }
    //        );
    //}

}
