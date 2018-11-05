import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {map, switchMap, takeUntil} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Component({
    selector: 'app-drag-drop',
    templateUrl: './drag-drop.component.html',
    styleUrls: ['./drag-drop.component.less'],
    // encapsulation: ViewEncapsulation.Emulated
})
export class DragDropComponent implements OnInit, AfterViewInit {

    @ViewChild('box') box: ElementRef;
    
    constructor() {
    }
    
    ngOnInit() {
        const mouseDown$ = fromEvent(this.box.nativeElement, 'mousedown');
        const mouseMove$ = fromEvent(this.box.nativeElement, 'mousemove');
        const mouseUp$ = fromEvent(this.box.nativeElement, 'mouseup');
    
        mouseDown$.pipe(
            map((event: MouseEvent) => ({
                pos: this.getTranslate(this.box),
                event,
            })),
            switchMap((state) => {
               const pos = state.pos;
               console.log('pos', pos);
               const {clientX, clientY} = state.event;
               console.log('client', clientX, clientY);
               return mouseMove$.pipe(
                   map((moveEvent: MouseEvent) => ({
                       x: moveEvent.clientX - clientX + pos.x,
                       y: moveEvent.clientY - clientY + pos.y,
                   })),
                   takeUntil(mouseUp$),
               );
            }),
        ).subscribe((pos) => {
            console.log(pos);
            this.setTranslate(this.box, pos);
        });
        
    }
    
   ngAfterViewInit() {
       this.setTranslate(this.box, {x: 20, y: 40});
       console.log(this.getTranslate(this.box));
   }
    
    getTranslate(element: ElementRef) {
        const [x, y] = element.nativeElement.style.transform.match(/\d+/g);
        return {x: Number(x), y: Number(y)};
    }
    
    setTranslate(element: ElementRef, pos: {x: number, y: number}) {
        element.nativeElement.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
    
}
