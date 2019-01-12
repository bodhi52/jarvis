import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
    selector: 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ['./reactive-form.component.less']
})
export class ReactiveFormComponent implements OnInit {
    
    validateForm: FormGroup;
    
    constructor(
        private fb: FormBuilder,
    ) {
    }
    
    ngOnInit() {
        this.validateForm = this.fb.group({
            code: [33, [Validators.required, this.onlyNumber(), Validators.maxLength(6)]],
        });
    }
    
    /**
     * 只可以输入数字的验证器，除了数字之外，都不可输入
     */
    onlyNumber(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            // value有值且如果值包含非数字，就需要替换
            if (control.value && !/^\d*$/.test(control.value)) {
                control.setValue(control.value.replace(/[^0-9]/ig, ''), {
                    emitEvent: false,
                    emitViewToModelChange: false,
                });
            }
            return null;
        };
    }
    
    submit() {
        console.log(this.validateForm.getRawValue());
    }
}
