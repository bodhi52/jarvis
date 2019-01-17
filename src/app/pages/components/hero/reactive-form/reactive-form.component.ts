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
    
    @ViewChild('input') input: ElementRef;
    
    
    isComposit: boolean = false;
    
    constructor(
        private fb: FormBuilder,
    ) {
    }
    
    ngOnInit() {
        this.validateForm = this.fb.group({
            code: [33, [Validators.required, this.onlyNumber(), Validators.maxLength(6)]],
        });
        
        this.formGroup = new FormGroup({
            code: new FormControl(null, {
                validators: [Validators.required, Validators.maxLength(4)],
            }),
        }, {
            updateOn: 'blur',
        });
        
        this.subscrb$ = this.formGroup.controls['code'].valueChanges.subscribe(res => {
            console.log('change', res);
        });
        
        
    }
    
    replaceFn = (el: ElementRef, $event) => {
        console.log('replaceFn');
        const target = $event.target;
        const regexp = /\d*\.?\d{0,8}/g;
        const match = target.value.match(regexp);
        console.log('target.value', target.value);
        console.log('match', match);
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
        this.formGroup.updateValueAndValidity();
        console.log('input', this.input.nativeElement.value);
        console.log('formgroup', this.formGroup.getRawValue());
    }
}
