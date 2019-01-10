import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {interval, Observable, Subscription, timer} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    
    form: FormGroup;
    loading = false;
    
    timer$: Observable<number>;
    timerSub: Subscription;
    
    constructor(
        private fb: FormBuilder,
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
        this.init();
    }
    
    init() {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }
    
    submit() {
        this.loading = true;
        this.timer$ = timer(new Date(1539254919994), 1000, );
        this.timerSub = this.timer$.subscribe(number => {
            console.log('number', number);
            if (number > 10) {
                this.timerSub.unsubscribe();
            }
        });

        // const interval$ = interval(3000);
        // const sub = interval$.subscribe(number => {
        //     console.log('number', number);
        //     this.loading = false;
        //     sub.unsubscribe();
        // });
        
        return;
        // for (const i of Object.keys(this.form.controls)) {
        //     this.form.controls[i].markAsDirty();
        //     this.form.controls[i].updateValueAndValidity();
        //     if (this.form.controls[i].invalid) {
        //         return false;
        //     }
        // }
        //
        // // 验证用户名和密码。
        // const params = this.form .getRawValue();
        //
        // setTimeout(() => {
        //     this.loading = false;
        //     if (params.name === 'admin' && params.password === '123456') {
        //         this.msg.success('登录成功');
        //     } else {
        //         this.msg.error('用户名或密码错误');
        //     }
        // }, 1000);
        
    }
    
}
