import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

@Directive({
    selector: '[appLimitInput]'
})
export class LimitInputDirective implements ControlValueAccessor {
    
    
    /**
     * 可以是字符串或自定义的正则表达式
     * -- 字符串的时候就找内置的一些正则表达式
     * -- 正则表达式的时候直接使用
     */
    @Input() replace: string|RegExp;
    
    // 限制输入的正则表达式
    _regexp: RegExp;
    
    isComposite: boolean = false;
    
    /**
     * 对复杂的业务传入方法
     */
    @Input() replaceFn: Function;
    
    writeValue(value: any): void {
        this.render.setProperty(this.el.nativeElement, 'value', value);
    }
    
    constructor(
        private el: ElementRef,
        private control: NgControl,
        private render: Renderer2,
    ) {
    }
    
    /**
     * 选词输入开始
     */
    @HostListener('compositionstart') onCompositionStart() {
        this.isComposite = true;
    }
    
    /**
     * 选词输入结束（确定输入或取消输入）
     */
    @HostListener('compositionend', ['$event']) onCompositionEnd($event) {
        this.isComposite = false;
        this.limitInput($event);
        
    }
    
    @HostListener('change', ['$event']) onChange($event) {
        this.control.control.setValue(this.el.nativeElement.value);
    }
    
    /**
     * 应对输入被格式化导致不接发change事件的问题。所以这里在blur的时候也进行重新赋值
     * @param $event
     */
    @HostListener('blur', ['$event']) onBlur($event) {
        this.control.control.setValue(this.el.nativeElement.value);
    }
    
    /**
     * 正常输入
     */
    @HostListener('input', ['$event']) onInput($event) {
        this.limitInput($event);
    }
    
    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }
    
    registerOnTouched(fn: any): void {
        this.onBlur = fn;
    }
    
    private limitInput($event) {
        if (!$event || !$event.target.value || this.isComposite) {
            return;
        }
        const target = $event.target;
        if (this.replaceFn) {
            this.replaceFn(this.el, $event);
            return;
        } else {
            this._regexp = this.getRegexp(this.replace);
            this.el.nativeElement.value = target.value.replace(this._regexp, '');
        }
       
    }
    
    private getRegexp(str) {
        if (typeof str === 'object') {
            return str;
        }
        let regexp;
        switch (str) {
            case 'en':
                regexp = /(^\s|[\u4e00-\u9fa5])/g;
                break;
            case 'number':
                regexp = /[^0-9]/ig;
                break;
            case 'number|letter':
                regexp = /[^\d|\w]/ig;
                break;
            case 'float':
                this.replace = /[^\d|\.]/ig;
                break;
        }
        return regexp;
    }
}
