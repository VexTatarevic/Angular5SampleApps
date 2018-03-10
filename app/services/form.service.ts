
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import { Component } from '@angular/core';

@Injectable()
/**
 * Utility service for reactive forms.
 * Automatically attaches form control value change listeners
 * AUtomatically creates Error model inside component object for each form control using naming convention [ControlName]Errors. THen these errors can be accessed in html template.
 * Does data binding to and from given data model
 *
 * @author Vex Tatarevic 2018-03-06
 * @class
 */
export class FormService {

    constructor(
        private component: Component,
        private form: FormGroup,
        private errorMessages: any,
        private options: any = null // { control1Name : { debounceTime: 1000 , somethingElse : 'blah' }, control2Name : { ... } }
    ) {
        this.set(options);
    }

    // Attach value change listener on each control inside the form group
    private set(options): void {

        Object.keys(this.form.controls).map(controlName => {
            var controlOptions = options ? options[controlName] : null;
            this.setControlChangeListener(controlName, controlOptions);
        });
    }

    private getMessageModelName(formControlName: string): string {
        // Dynamically create component property for errors related to this control
        // Enforce naming convention : [ControlName]Errors
        return formControlName + 'Errors';
    }

    isInvalid(formControlName: string) {
        var c = this.form.get(formControlName);
        var invalid = (c.touched || c.dirty) && c.errors;
        if (invalid) {
            var control = this.form.get(formControlName);
            var messageModelName = this.getMessageModelName(formControlName);
            var controlMessages = this.errorMessages[formControlName];
            this.setControlErrorMessages(control, messageModelName, controlMessages);
        }
        return invalid;
    }

    isError(formControlName: string, errorType: string) {
        var c = this.form.get(formControlName);
        return c.errors[errorType];
    }

    setControlErrorMessages(
        control: AbstractControl,
        messageModelName: string,
        controlMessages: string[]) {


        // only display validation message if control has been touched or changed and it has errors
        if ((control.touched || control.dirty) && control.errors) {


            // if any keys in control errors array match keys in allMessages array, 
            // then take error message under that key and add it to our message
            //messageModel = Object.keys(control.errors)
            //    .map(key => allMessages[key])
            //    .join('</li><li>');

            // if there are any errors add them to message array for display
            var errors = [];
            for (var key in control.errors) {
                var msg = controlMessages[key];
                if (msg) {
                    errors.push(msg);
                }
            }
            if (errors.length > 0) {
                setTimeout(() => {
                    this.component[messageModelName] = errors;
                });
            }
        }
    }

    setControlChangeListener(
        formControlName: string,
        options: any // { debounceTime: 1000 , somethingElse : 'blah' }
    ): void {

        var control = this.form.get(formControlName);

        // get debounceTime from options otherwise set default debounce time to 0
        var debounceTime = (options && options.debounceTime ? options.debounceTime : 0);

        var messageModelName = this.getMessageModelName(formControlName);

        // dynamically create and initialize  as null error model for this control inside the component before any validation is done
        this.component[messageModelName] = null;

        var self = this;

        // listen for value change 
        control.valueChanges
            .debounceTime(debounceTime)
            .subscribe(value => {

                //setTimeout(() => {
                // clear error messages for this control
                self.component[messageModelName] = null;
                //});

                // get subset of all error messages related to this control
                var controlMessages = this.errorMessages[formControlName];
                self.setControlErrorMessages(control, messageModelName, controlMessages);
            });
    }

    /**
     * Map data from fields of given data model to form controls of the form
     * @param model
     */
    bind(model):void {
        Object.keys(model).forEach(name => {
            if (this.form.controls[name]) {
                var value = model[name];
                (this.form.controls[name] as FormControl)
                    .patchValue(value, { onlySelf: true, emitEvent: true });
            }
        });
    }

    /**
     * Update data model with data from form
     * @param model
     */
    updateModel(model): void {
        Object.keys(model).forEach(name => {
            if (this.form.controls[name]) {
                model[name] = (this.form.controls[name] as FormControl).value;
            }
        });
    }


}
