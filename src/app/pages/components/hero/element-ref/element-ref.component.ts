import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';

@Component({
    selector: 'app-element-ref',
    templateUrl: './element-ref.component.html',
    styleUrls: ['./element-ref.component.less']
})
export class ElementRefComponent implements OnInit, AfterViewInit {
    
    @ViewChild('code') codeEl: ElementRef;
    
    @ViewChild(HeroDetailComponent) heroDetail: ElementRef;
    
    constructor(
        private render: Renderer2,
        private el: ElementRef,
    ) {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        const p = this.render.createElement('p');
        this.render.setAttribute(p, 'id', 'test');
        this.render.setProperty(p, 'className', 'test');
        this.render.setProperty(p, 'innerText', 'test');
        this.render.appendChild(this.el.nativeElement, p);
    }
    
    
    consoleValue() {
        const p = document.getElementById('test');
        this.render.setValue(this.codeEl.nativeElement, 'set value');
        console.log(this.codeEl.nativeElement.value);
    }
    
    
    
}
