import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

// 大对象的组成item
interface TranslateItemInterface {
    en?: string;
    zh?: string;
    ko?: string;
}

@Component({
    selector: 'app-high-level',
    templateUrl: './high-level.component.html',
    styleUrls: ['./high-level.component.less']
})
export class HighLevelComponent implements OnInit {
    
    @ViewChild('copyArea') copyArea: ElementRef;
    
    prefix: string;
    
    zhTran: string;
    enTran: string;
    koTran: string;
    
    showResult: boolean = false;
    
    resultArr: {
        key: string,
        zh: string
        en: string,
        ko: string,
    }[] = [];
    
    // 使用一个大对象存储所出现的所有key，利用json里面key不可以重复的特性
    bigObj: object = {};
    
    constructor(
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
    }
    
    /**
     * 重置
     */
    reset() {
        this.prefix = null;
        this.zhTran = null;
        this.enTran = null;
        this.koTran = null;
        this.bigObj = {};
        this.resultArr = [];
        this.showResult = false;
    }
    
    showExample() {
        this.prefix = 'Independence';
        
        this.enTran = `{
        "login": {
            "login": "Login",
            "or": "or",
            "register": "Register",
            "accountPH": "Email",
            "emailErrorText": "Enter a correct email address",
            "passwordPH": "Password",
            "captcha": "Captcha",
            "passwordErrorText": "Enter your password!",
            "forgetPWD": "Forgot Password",
            "loginSecondaryVerification": "Two-factor verification",
            "lostGoogleCode": "Lost Your Google Authenticator?"
        },
        "register": {
            "code": "Verification code",
            "mailCode": "Send",
            "emailErrorText": "Enter your email verification code!",
            "passwordNZTitle": "8-32 bits contain at least three of the numbers, capital, lowercase letters and special symbols.",
            "passwordTitle": "Password rules 8-32 characters!",
            "confirmPWD": "Confirm Password",
            "confirmPWDErrorTxt": "Confirm your password!",
            "confirmPWDErrorText": "Password is inconsistent!",
            "agreeTxt": "I have read",
            "agreeUrl": "DCEX Agreement",
            "createAccount": "Create Account",
            "registerSuccessTitle": "registration success",
            "registerSuccessText": "Jump automatically within {{time}}s, if it does not jump successfully, please click the link below.",
            "clickMe": "Click to move"
        }
}`;
        this.zhTran = `{
        "login": {
            "login": "登录",
            "or": "或",
            "register": "注册",
            "accountPH": "邮箱",
            "captcha": "Captcha",
            "emailErrorText": "请输入正确的邮箱！",
            "passwordPH": "密码",
            "passwordErrorText": "请输入正确的密码!",
            "forgetPWD": "忘记密码",
            "loginSecondaryVerification": "二次验证",
            "lostGoogleCode": "丢失谷歌验证码?"
        },
        "register": {
            "code": "验证码",
            "mailCode": "发送",
            "emailErrorText": "请输入邮箱验证码",
            "passwordNZTitle": "8-32位至少包含数字、大写字母、小写字母、特殊符号其中的3种。",
            "passwordTitle": "密码规则：8-32位!",
            "confirmPWD": "确认密码",
            "confirmPWDErrorTxt": "请再次确认您的密码!",
            "confirmPWDErrorText": "密码不正确!",
            "agreeTxt": "我已经阅读",
            "agreeUrl": "DCEX用户协议",
            "createAccount": "创建账户",
            "registerSuccessTitle": "注册成功",
            "registerSuccessText": "{{time}}s内自动跳转，如果未成功跳转，请点击下方链接跳转",
            "clickMe": "点此跳转"
        }
}`;
        
        this.koTran = `{
        "login": {
            "login": "로그인",
            "or": "혹은",
            "register": "가입",
            "accountPH": "Email",
            "captcha": "Captcha",
            "emailErrorText": "정확한 Email을 입력해주세요!",
            "passwordPH": "비밀번호",
            "passwordErrorText": "비밀번호가 일치하지 않습니다!",
            "forgetPWD": "비밀번호 찾기",
            "loginSecondaryVerification": "2차 인증",
            "lostGoogleCode": "구글 OTP를 잃어버렸습니까?"
        },
        "register": {
            "code": "인증번호",
            "mailCode": "Email 인증번호",
            "emailErrorText": "Email 인증번호를 입력해주세요.",
            "passwordNZTitle": "영문 소문자, 대문자, 숫자, 특수문자를 포함하여 8자리 이상 32자리 이하로 만드셔야 합니다.",
            "passwordTitle": "비밀번호 규칙：8-32자리!",
            "confirmPWD": "비밀번호 확인",
            "confirmPWDErrorTxt": "비밀번호 재확인!",
            "confirmPWDErrorText": "비밀번호가 일치하지 않습니다!",
            "agreeTxt": "이용약관에 동의합니다.",
            "agreeUrl": "REX계약",
            "createAccount": "계좌 생성",
            "registerSuccessTitle": "가입성공",
            "registerSuccessText": "{{time}}s후 자동으로 이동되며 이동되지 못했을 경우 아래 링크를 클릭하여 이동하시기 바랍니다.",
            "clickMe": "이동하기"
        }
}`;
        this.submitForm();
    }
    
    submitForm() {
        this.transferToBigObj();
        this.showResult = true;
        this.getResultList();
    }
    
    transferToBigObj() {
        if (this.enTran) {
            try {
                const obj = JSON.parse(this.enTran);
                this.tieObjToBigObj(obj, 'en');
            } catch (e) {
                this.msg.error('英文json格式错误，请检查json');
            }
        }
        if (this.zhTran) {
            try {
                const obj = JSON.parse(this.zhTran);
                this.tieObjToBigObj(obj, 'zh');
            } catch (e) {
                this.msg.error('中文json格式错误，请检查json');
            }
        }
        if (this.koTran) {
            try {
                const obj = JSON.parse(this.koTran);
                this.tieObjToBigObj(obj, 'ko');
            } catch (e) {
                this.msg.error('韩文json格式错误，请检查json');
            }
        }
    }
    
    getResultList() {
        for (const key of Object.keys(this.bigObj)) {
            this.resultArr.push({
                key: key,
                en: this.bigObj[key].en || '', // 不要生成undefined
                zh: this.bigObj[key].zh || '', // 不要生成undefined
                ko: this.bigObj[key].ko || '', // 不要生成undefined
            });
        }
    }
    
    /**
     * 打平对象，保存到大对象中
     * @param obj 正在进行的对象
     * @param type 正在处理的语言类型
     * @param key json中上级key
     */
    tieObjToBigObj(obj, type: 'en' | 'ko' | 'zh',  key = '') {
        if (key) {
            key += '.';
        }
        for (const k of Object.keys(obj)) {
            if (typeof obj[k] === 'string') {
                if (!this.bigObj[key + k]) {
                    this.bigObj[key + k] = {};
                }
                this.bigObj[key + k][type] = obj[k];
    
                continue;
            }
            if (typeof obj[k] === 'object') {
                this.tieObjToBigObj(obj[k], type, key + k);
            }
        }
    }
    
    
    copy() {
        const arr = [];
        const prefix = this.prefix ? this.prefix + '.' : null;
        for (const i of this.resultArr) {
            arr.push(prefix + i.key + '&#9;' + i.en + '&#9;' + i.zh + '&#9;' + i.ko);
        }
        // 将对应的数据填充到拷贝的div中
        this.copyArea.nativeElement.innerHTML = '<pre>' + arr.join('\n') + '</pre>';
        this.copyText();
    }
    
    /**
     * 复制文本
     */
    copyText() {
        // const myEle = document.getElementById('copy-area');
        const myEle = document.getElementsByTagName('pre');
        console.log('myEle', myEle[0]);
        const range = document.createRange();
        const selection = window.getSelection();
        
        range.selectNodeContents(myEle[0]);
        selection.removeAllRanges(); // 先移除掉所有的选择区域
        selection.addRange(range); // 添加元素的目标选择区域
        try {
            if (document.execCommand) {
                // 复制选中的文字到剪贴板
                document.execCommand('copy', false, null);
                selection.removeAllRanges(); // 移除掉所有的选择区域
                this.msg.success('复制成功');
                
            }
        } catch (e) {
            console.log('不支持复制命令：', e);
            this.msg.error('不支持复制命令');
            
        }
    }
}
