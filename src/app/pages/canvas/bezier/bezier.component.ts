import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Point from '../../../util/point';
import Canvas from '../../../util/canvas';
import BezierLine from '../../../util/bezier-line';

@Component({
    selector: 'app-bezier',
    templateUrl: './bezier.component.html',
    styleUrls: ['./bezier.component.less']
})
export class BezierComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvasOne') canvasOne: ElementRef;
    contextOne: CanvasRenderingContext2D;
    @ViewChild('canvasTwo') canvasTwo: ElementRef;
    contextTwo: CanvasRenderingContext2D;
    @ViewChild('canvasThree') canvasThree: ElementRef;
    contextThree: CanvasRenderingContext2D;
    @ViewChild('canvasFour') canvasFour: ElementRef;
    contextFour: CanvasRenderingContext2D;
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit(): void {
        this.contextOne = this.canvasOne.nativeElement.getContext('2d');
        this.drawBg(this.contextOne, this.canvasOne.nativeElement);
        this.drawOneLevelBezier();
    
        this.contextTwo = this.canvasTwo.nativeElement.getContext('2d');
        this.drawBg(this.contextTwo, this.canvasTwo.nativeElement);
        this.drawTwoLevelBezier();
    
        this.contextThree = this.canvasThree.nativeElement.getContext('2d');
        this.drawBg(this.contextThree, this.canvasThree.nativeElement);
        this.drawThreeLevelBezier();
        
        this.contextFour = this.canvasFour.nativeElement.getContext('2d');
        this.drawBg(this.contextFour, this.canvasFour.nativeElement);
        this.drawUniformBezier();
    }
    drawBg(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    drawOneLevelBezier() {
        const begin: Point = new Point(20, 20);
        const end: Point = new Point(600, 250);
        // 获得贝塞尔曲线上的点
        for (let i = 0; i < 100; i += 1) {
            const t = i / 100;
            const p = new Point(
                (1 - t) * begin.x + t * end.x,
                (1 - t) * begin.y + t * end.y,
            );
            const color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
            Canvas.drawCycle(this.contextOne, p, 3, color);
        }
    }
    
    drawTwoLevelBezier() {
        const begin: Point = new Point(20, 280);
        const end: Point = new Point(680, 280);
        const line: BezierLine = new BezierLine(begin, end);
        for (let i = 0; i < 100; i += 1) {
            const t = i / 100;
            const p = line.calculateBezierPointForQuadratic(t);
            const color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
            Canvas.drawCycle(this.contextTwo, p, 8, color);
        }
    }
    
    drawUniformBezier() {
        const begin: Point = new Point(20, 280);
        const end: Point = new Point(680, 280);
        const line = new BezierLine(begin, end);
        // 贝塞尔曲线的长度
        const len = Math.floor(line.getLength(1));
        // 分割份数为曲线的长度
        for (let j = 0; j < 100; j += 1) {
            let t = j / 100;
            const l = t * len;
            t = line.invertL(t, l);
            
            const point = line.calculateBezierPointForQuadratic(t);
            const color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
            Canvas.drawCycle(this.contextFour, point, 8, color);
        }
    }
    
    drawThreeLevelBezier() {
        const p0: Point = new Point(20, 150);
        const p3: Point = new Point(680, 150);
        const p1: Point = new Point(200, -100);
        const p2: Point = new Point(400, 480);
        for (let i = 0; i < 100; i += 2) {
            const t = i / 100;
            const temp = 1 - t;
            const p = new Point(
                Math.pow(temp, 3) * p0.x + 3 * t * Math.pow(temp, 2) * p1.x + 3 * p2.x * Math.pow(t, 2) * temp + p3.x * Math.pow(t, 3),
                Math.pow(temp, 3) * p0.y + 3 * t * Math.pow(temp, 2) * p1.y + 3 * p2.y * Math.pow(t, 2) * temp + p3.y * Math.pow(t, 3),
            );
            const color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
            Canvas.drawCycle(this.contextThree, p, 3, color);
        }
    }
    
   
}
