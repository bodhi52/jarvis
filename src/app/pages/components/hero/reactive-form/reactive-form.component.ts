import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ['./reactive-form.component.less']
})
export class ReactiveFormComponent implements OnInit {
    
    validateForm: FormGroup;
    
    formGroup: FormGroup;
    
    subscrb$: Subscription;
    
    isComposite: boolean = false;
    
    regexp: RegExp = /[^\d|\.]/ig;
    
    @ViewChild('input') input: ElementRef;
    
    
    isComposit: boolean = false;
    
    constructor(
        private fb: FormBuilder,
    ) {
    }
    
    ngOnInit() {
        this.validateForm = this.fb.group({
            code: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
            alterEgo: [null],
        }, {
            validator: this.testValidator
        });
    }
    
    testValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const name = control.get('code');
        const alterEgo = control.get('alterEgo');
        return name && alterEgo && name.value === alterEgo.value ? {'identityRevealed': true} : null;
    }
    
    submit() {
    }
}
