import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    
    form: FormGroup;
    loading = false;
    
    constructor(
        private fb: FormBuilder,
        private msg: NzMessageService,
    ) {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }
    
    ngOnInit() {
    
    }
    
    submit() {
        for (const i of Object.keys(this.form.controls)) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
            if (this.form.controls[i].invalid) {
                return false;
            }
        }
        
        // 验证用户名和密码。
        const params = this.form .getRawValue();
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            if (params.name === 'admin' && params.password === '123456') {
                this.msg.success('登录成功');
            } else {
                this.msg.error('用户名或密码错误');
            }
        }, 1000);
        
    }
    
}
