import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Point from '../../../../util/point';

@Component({
    selector: 'app-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.less']
})
export class SegmentComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvas') canvas: ElementRef;
    
    context: CanvasRenderingContext2D;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.drawBg(this.context, this.canvas.nativeElement);
        this.drawLine();
    }
    
    private render() {
        this.drawLine();
        window.requestAnimationFrame(this.render.bind(this));
    }
    
    drawBg(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    drawLine() {
        const curvature = 0.4;
        this.context.lineWidth = 5;
        const start = new Point(100, 100);
        const end = new Point(200, 300);
        const cp = new Point(
            (start.x + end.x) / 2 - (start.y - end.y) * curvature,
            (start.y + end.y) / 2 - (end.x - start.x) * curvature,
        );
        const v01 = [cp.x - start.x, cp.y - start.y];     // 向量<start, cp>
        const v12 = [end.x - cp.x, end.y - cp.y];     // 向量<cp, end>
        let next = start;
        for (let i = 0; i < 100; i += 20) {
            this.context.beginPath();
            this.context.strokeStyle = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
            console.log('next', JSON.stringify(next));
            next = this.drawCurvePath(next, cp, v01, v12, i);
            this.context.stroke();
            this.context.closePath();
        }
        
        
    }
    
    drawCurvePath(start, cp, v01, v12, percent): Point {
        const t = percent / 100;
      
        
        const q0: Point = new Point(
            start.x + v01[0] * t,
            start.y + v01[1] * t
        );
        const q1: Point = new Point(
            cp.x + v12[0] * t,
            cp.y + v12[1] * t,
        );
        
        const v = [q1.x - q0.x, q1.y - q0.y];       // 向量<q0, q1>
        
        const b: Point = new Point(
            q0.x + v[0] * t,
            q0.y + v[1] * t
        );
        
        this.context.moveTo(start.x, start.y);
        
        this.context.quadraticCurveTo(
            q0.x, q0.y,
            b.x, b.y
        );
        return b;
    }
}
