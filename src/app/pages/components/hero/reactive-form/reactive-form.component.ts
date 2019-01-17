import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
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
            code: [null, [Validators.required, this.onlyNumber(), Validators.minLength(2), Validators.maxLength(6)]],
        }, {
            updateOn: 'blur',
        });
        
        this.formGroup = new FormGroup({
            code: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(2), Validators.maxLength(4)],
            }),
        }, {
            updateOn: 'blur',
        });
        
        this.subscrb$ = this.formGroup.controls['code'].valueChanges.subscribe(res => {
            console.log('change', res);
        });
        
        
    }
    
    replaceFn = (el: ElementRef) => {
        console.log('replaceFn');
        const regexp = /\d*\.?\d{0,8}/g;
        const match = el.nativeElement.value.match(regexp);
        el.nativeElement.value =  match ? match[0] : '';
    }
    
    /**
     * 只可以输入数字的验证器，除了数字之外，都不可输入
     */
    onlyNumber(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            console.log('control', control.value);
            // value有值且如果值包含非数字，就需要替换
            if (control.value && !/^\d*$/.test(control.value)) {
                control.setValue(control.value.replace(/[^0-9]/ig, ''), {
                    emitEvent: false,
                    // emitModelToViewChange: false,
                    emitViewToModelChange: false,
                });
            }
            return null;
        };
    }
    
    submit() {
        console.log('input', this.input.nativeElement.value);
        console.log('formgroup', this.formGroup.getRawValue());
    }
}
