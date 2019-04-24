import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Point from '../../../util/point';

@Component({
    selector: 'app-sin-cos',
    templateUrl: './sin-cos.component.html',
    styleUrls: ['./sin-cos.component.less']
})
export class SinCosComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvasSin') canvasSinDom: ElementRef;
    @ViewChild('canvasCos') canvasCosDom: ElementRef;
    
    sinContext: CanvasRenderingContext2D;
    cosContext: CanvasRenderingContext2D;
    
    bgColor: string = '#000';
    
    // 坐标轴的配置
    axisConfig = {
        origin: new Point(20, 0),
        xLen: 400,
        yLen: 250,
        // 箭头的角度
        arrowAngle: 30,
        // 箭头的长度
        arrowLen: 10,
        // 坐标轴颜色
        color: '#fff',
        // 辅助线颜色
        auxColor: 'yellow',
        // 坐标轴线宽
        width: 2,
    };
    // 圆的配置
    cycleConfig = {
        // 半径
        radius: 90,
        // 圆的颜色
        color: '#FF7256',
    };
    // 角度
    angle: number = 0;
    // 速度
    speed: number = 1;
    
    sinLineArr: Point[] = [];
    cosLineArr: Point[] = [];
    
    
    constructor() {
    }
    
    ngOnInit() {
        this.sinContext = this.canvasSinDom.nativeElement.getContext('2d');
        this.cosContext = this.canvasCosDom.nativeElement.getContext('2d');
    }
    
    ngAfterViewInit(): void {
        this.axisConfig.origin = new Point(240, this.canvasSinDom.nativeElement.height / 2);
        this.drawBg(this.cosContext);
        this.initSin();
        this.drawSin(this.sinContext);
        this.initCos();
        this.drawCos(this.cosContext);
        this.render();
    }
    
    private render() {
        this.drawBg(this.sinContext);
        this.drawBg(this.cosContext);
        this.drawSin(this.sinContext);
        this.drawCos(this.cosContext);
        this.animation();
        window.requestAnimationFrame(this.render.bind(this));
    }
    
    private drawBg(context: CanvasRenderingContext2D) {
        this.drawAxis(context, this.canvasSinDom.nativeElement);
        this.drawAux(context, this.canvasSinDom.nativeElement);
        this.drawCycle(context, this.canvasSinDom.nativeElement);
        // this.drawSin(context);
    }
    
    private animation() {
        this.angle = Math.floor(this.angle + this.speed) % 360;
        this.sinCyclePoint(this.sinContext, this.angle);
        this.cosCyclePoint(this.cosContext, this.angle);
        
    }
    
    private initSin() {
        // 生成一个周期的sin线上的点
        for (let angle = 0; angle < 360; angle++) {
            const radians = angle * Math.PI / 180;
            const x = this.axisConfig.origin.x + angle;
            const y = this.axisConfig.origin.y - Math.sin(radians) * this.cycleConfig.radius;
            this.sinLineArr.push(new Point(x, y));
        }
    }
    
    private initCos() {
        // 生成一个周期的sin线上的点
        for (let angle = 0; angle < 360; angle++) {
            const radians = angle * Math.PI / 180;
            const x = this.axisConfig.origin.x + angle;
            const y = this.axisConfig.origin.y - Math.cos(radians) * this.cycleConfig.radius;
            this.cosLineArr.push(new Point(x, y));
        }
    }
    
    private drawSin(context: CanvasRenderingContext2D) {
        for (const p of this.sinLineArr) {
            this.drawPoint(context, p, 1);
        }
    }
    
    private drawCos(context: CanvasRenderingContext2D) {
        for (const p of this.cosLineArr) {
            this.drawPoint(context, p, 1);
        }
    }
    
    private sinCyclePoint(context: CanvasRenderingContext2D, angle) {
        const radians = angle * Math.PI / 180; // 弧度
        const p = new Point(
            this.axisConfig.origin.x - this.cycleConfig.radius + this.cycleConfig.radius * Math.cos(radians),
            this.axisConfig.origin.y - this.cycleConfig.radius * Math.sin(radians)
        );
        this.drawPoint(context, p, 5, 'red');
        // 从圆心到圆上点的连线
        this.drawLine(context, new Point(this.axisConfig.origin.x - this.cycleConfig.radius, this.axisConfig.origin.y), p);
        // 连接圆上的点到sin曲线
        this.drawLine(context, p, this.sinLineArr[angle]);
        this.drawPoint(context, this.sinLineArr[angle], 5, 'red');
    }
    
    private cosCyclePoint(context: CanvasRenderingContext2D, angle) {
        const radians = angle * Math.PI / 180; // 弧度
        const p = new Point(
            this.axisConfig.origin.x - this.cycleConfig.radius + this.cycleConfig.radius * Math.sin(radians),
            this.axisConfig.origin.y - this.cycleConfig.radius * Math.cos(radians)
        );
        this.drawPoint(context, p, 5, 'red');
        // 从圆心到圆上点的连线
        this.drawLine(context, new Point(this.axisConfig.origin.x - this.cycleConfig.radius, this.axisConfig.origin.y), p);
        // 连接圆上的点到sin曲线
        this.drawLine(context, p, this.cosLineArr[angle]);
        this.drawPoint(context, this.cosLineArr[angle], 5, 'red');
    }
    
    /**
     * 画点
     * @param context
     * @param p
     * @param radius
     * @param color
     */
    private drawPoint(context: CanvasRenderingContext2D, p: Point, radius: number, color: string = '#fff') {
        context.beginPath();
        context.fillStyle = color;
        context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
    
    /**
     * 画线
     * @param context
     * @param begin
     * @param end
     * @param lineWidth
     * @param color
     */
    private drawLine(context: CanvasRenderingContext2D, begin: Point, end: Point, lineWidth: number = 1, color: string = '#fff') {
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
    }
    
    
    /**
     * 画出直角坐标系
     * @param context
     * @param canvas
     */
    private drawAxis(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        // 填充背景
        context.fillStyle = this.bgColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        // 画出x轴和y轴
        context.beginPath();
        const xStart = new Point(this.axisConfig.origin.x, this.axisConfig.origin.y);
        const xEnd = new Point(xStart.x + this.axisConfig.xLen, xStart.y);
        const yStart = new Point(this.axisConfig.origin.x, this.axisConfig.origin.y - Math.floor(this.axisConfig.yLen / 2));
        const yEnd = new Point(this.axisConfig.origin.x, this.axisConfig.origin.y + Math.floor(this.axisConfig.yLen / 2));
        context.lineWidth = this.axisConfig.width;
        context.strokeStyle = this.axisConfig.color;
        context.moveTo(xStart.x, xStart.y);
        context.lineTo(xEnd.x, xEnd.y);
        context.moveTo(yStart.x, yStart.y);
        context.lineTo(yEnd.x, yEnd.y);
        context.stroke();
        context.closePath();
        // x轴和y轴的尖角
        // 将角度换算成弧度
        const radians = this.axisConfig.arrowAngle * Math.PI / 180;
        // 知道一个直角边和角度，来求另一个直角边的长度
        const deltaLen = this.axisConfig.arrowLen * Math.atan(radians);
        context.beginPath();
        context.fillStyle = this.axisConfig.color;
        context.lineWidth = this.axisConfig.width;
        context.moveTo(xEnd.x - this.axisConfig.arrowLen, xEnd.y - deltaLen);
        context.lineTo(xEnd.x, xEnd.y);
        context.lineTo(xEnd.x - this.axisConfig.arrowLen, xEnd.y + deltaLen);
        // y轴尖角
        context.moveTo(yStart.x - deltaLen, yStart.y + this.axisConfig.arrowLen);
        context.lineTo(yStart.x, yStart.y);
        context.lineTo(yStart.x + deltaLen, yStart.y + this.axisConfig.arrowLen);
        context.stroke();
        context.closePath();
    }
    
    /**
     * 画出辅助线
     * @param context
     * @param canvas
     */
    private drawAux(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const dashArr = [-90, 90, 180, 270, 360];
        dashArr.forEach(item => {
            // 绘制刻度
            context.font = '16px serif';
            context.fillStyle = this.axisConfig.color;
            if (item > 0) {
                const text = item + '°';
                const metrics = context.measureText(text);
                context.fillText(text, this.axisConfig.origin.x + item - (metrics.width / 2), this.axisConfig.origin.y + 20);
            }
             // 画出虚线，虚线的粒度控制为5
            const step = 5;
            const times = Math.floor(this.axisConfig.yLen / step);
            context.strokeStyle = this.axisConfig.auxColor;
            context.lineWidth = this.axisConfig.width;
            for (let i = 0; i <= times; i += 2) {
                context.moveTo(this.axisConfig.origin.x + item, this.axisConfig.origin.y - (this.axisConfig.yLen / 2) + (i - 1) * 5);
                context.lineTo(this.axisConfig.origin.x + item, this.axisConfig.origin.y - (this.axisConfig.yLen / 2) + i * 5);
            }
            
            context.stroke();
            context.closePath();
        });
    }
    
    private drawCycle(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        // 画出辅助线
        this.drawLine(
            context,
            new Point(this.axisConfig.origin.x - (this.cycleConfig.radius * 2), this.axisConfig.origin.y),
            new Point(this.axisConfig.origin.x, this.axisConfig.origin.y)
        );
        
        // 画圆
        context.beginPath();
        context.strokeStyle = this.cycleConfig.color;
        context.arc(this.axisConfig.origin.x - this.cycleConfig.radius, this.axisConfig.origin.y, this.cycleConfig.radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }
}
