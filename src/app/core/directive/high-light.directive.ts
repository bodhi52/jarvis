import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appHighLight]'
})
export class HighLightDirective {
    
    constructor(
        public el: ElementRef,
    ) {
        console.log(el);
        el.nativeElement.style.backgroundColor = 'red';
    }
    
    @HostListener('mouseenter') onMouseEnter() {
        this.heighLight('yellow');
    }
    
    @HostListener('mouseleave') onMouseLeave() {
        this.heighLight(null);
    }
    
    private heighLight(color: string) {
        console.log('color', color);
        this.el.nativeElement.style.backgroundColor = color;
    }
    
}
