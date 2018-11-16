import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    public x;
    public y;
}

@Component({
    selector: 'app-sin-cos',
    templateUrl: './sin-cos.component.html',
    styleUrls: ['./sin-cos.component.less']
})
export class SinCosComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvasSin') canvasSin: ElementRef;
    // @ViewChild('canvasCos') canvasCos: ElementRef;
    // @ViewChild('canvasTan') canvasTan: ElementRef;
    
    contextSin: CanvasRenderingContext2D;
    contextCos: CanvasRenderingContext2D;
    contextTan: CanvasRenderingContext2D;
    
    // 余弦的圆半径的长
    radious = 90;
    // 初始角度
    angle = 0;
    // 最大角度
    maxAngle = 360;
    // 速度
    speed = 2;
    // 运动的圆的半径
    ball = {
        radious: 8,
        color: 'red',
    };
    recordSin = [];
    recordCos = [];
    // 轨迹的颜色
    recordColor = 'green';
    
    axisConfig = {
        // 直角坐标轴的原点
        origin: new Point(0, 0),
        // x轴的长度
        xlen: 400,
        // y轴的长度
        ylen: 250,
        // 箭头角度
        arrowAngle: 30,
        // 箭头的长度
        arrowLen: 10,
        // 坐标轴的颜色
        axisColor: '#fff',
        // 辅助线颜色
        auxiliaryColor: 'yellow',
        // 坐标轴线宽
        axisWidth: 2,
    };
    
    // 背景的颜色
    bgColor = '#000';
    
    
    constructor(
        private elementRef: ElementRef,
    ) {
    }
    
    ngOnInit() {
        this.contextSin = this.canvasSin.nativeElement.getContext('2d');
        // this.contextCos = this.canvasCos.nativeElement.getContext('2d');
        // this.contextTan = this.canvasTan.nativeElement.getContext('2d');
    }
    
    ngAfterViewInit() {
        // 更新坐标系的原点
        this.axisConfig.origin.x = 240;
        this.axisConfig.origin.y = this.canvasSin.nativeElement.height / 2;
        [this.contextSin].forEach(item => {
            this.drawAxis(item);
        });
        // this.drawTan(this.contextTan);
        this.render();
    }
    
    private render() {
        this.drawSin(this.contextSin);
        // this.drawCos(this.contextCos);
        window.requestAnimationFrame(this.render.bind(this));
    }
    
    private drawSin(context: CanvasRenderingContext2D) {
        this.drawAxis(context);
        this.drawCycle(context);
        const radians = this.angle * Math.PI / 180;
        // 在坐标轴原点处起始 cos曲线
        context.beginPath();
        const x = this.axisConfig.origin.x + this.angle;
        const y = this.axisConfig.origin.y - Math.sin(radians) * this.radious;
        context.arc(x, y, this.ball.radious, 0, 2 * Math.PI);
        context.fillStyle = this.ball.color;
        context.fill();
        context.closePath();
        // 画线
        context.beginPath();
        
        context.moveTo(this.axisConfig.origin.x - this.radious + Math.cos(-radians) * this.radious,
            this.axisConfig.origin.y + Math.sin(-radians) * this.radious);
        context.lineTo(x, y);
        context.strokeStyle = 'orange';
        context.stroke();
        context.closePath();
        if (this.recordSin.length < (this.maxAngle / this.speed)) {
            this.recordSin.push(new Point(x, y));
        }
        
        
        for (let i = 0, len = this.recordSin.length; i < len; i++) {
            context.fillStyle = this.recordColor;
            context.beginPath();
            context.arc(this.recordSin[i].x, this.recordSin[i].y, 1, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        
        this.angle += this.speed;
        if (this.angle > this.maxAngle || this.angle < 0) {
            this.angle = 0;
        }
    }
    
    
    /**
     * 画圆
     */
    private drawCycle(context: CanvasRenderingContext2D) {
        // 画出圆的十字
        context.beginPath();
        context.moveTo(this.axisConfig.origin.x - (this.radious * 2), this.axisConfig.origin.y);
        context.lineTo(this.axisConfig.origin.x, this.axisConfig.origin.y);
        context.moveTo(this.axisConfig.origin.x - this.radious, this.axisConfig.origin.y - this.radious);
        context.lineTo(this.axisConfig.origin.x - this.radious, this.axisConfig.origin.y + this.radious);
        context.strokeStyle = 'orange';
        context.stroke();
        context.closePath();
        
        // 以原点左侧一个sin的半径画圆
        context.beginPath();
        context.arc(this.axisConfig.origin.x - this.radious, this.axisConfig.origin.y, this.radious, 0, 2 * Math.PI);
        context.strokeStyle = '#FF7256';
        context.stroke();
        context.closePath();
        // 画出半径绕圈
        context.beginPath();
        const radians = (-this.angle) * Math.PI / 180;
        const x = this.axisConfig.origin.x - this.radious + Math.cos(radians) * this.radious;
        const y = this.axisConfig.origin.y + Math.sin(radians) * this.radious;
        context.moveTo(this.axisConfig.origin.x - this.radious, this.axisConfig.origin.y);
        context.lineTo(x, y);
        context.strokeStyle = '#bbb';
        context.stroke();
        context.closePath();
    
        context.beginPath();
        context.arc(x, y, this.ball.radious, 0, 2 * Math.PI);
        // context.arc(100, 200, 20, 0, 2 * Math.PI);
        context.fillStyle = this.recordColor;
        context.closePath();
        context.fill();
    
    }
    
    private drawTan(context: CanvasRenderingContext2D) {
        this.drawAxis(context);
        for (let angle = 0; angle < 360; angle++) {
            context.beginPath();
            context.fillStyle = this.ball.color;
            const radians = angle * 2 * Math.PI / 360;
            const y = this.axisConfig.origin.y - Math.tan(radians) * this.radious;
            context.arc(angle / (360 / (this.axisConfig.xlen - this.ball.radious)) + this.axisConfig.origin.x, y,
                2, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        
    }
    
    
    drawCos(context: CanvasRenderingContext2D) {
        this.drawAxis(context);
        const radians = this.angle * Math.PI / 180;
        // 在坐标轴原点处起始 cos曲线
        context.beginPath();
        const x = this.axisConfig.origin.x + this.angle;
        const y = this.axisConfig.origin.y - Math.cos(radians) * this.radious;
        context.arc(x, y, this.ball.radious, 0, 2 * Math.PI);
        context.fillStyle = this.ball.color;
        context.fill();
        context.closePath();
        if (this.recordCos.length < (this.maxAngle / this.speed)) {
            this.recordCos.push(new Point(x, y));
        }
        
        
        for (let i = 0, len = this.recordCos.length; i < len; i++) {
            context.fillStyle = this.recordColor;
            context.beginPath();
            context.arc(this.recordCos[i].x, this.recordCos[i].y, 1, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        
        this.angle += this.speed;
        if (this.angle > this.maxAngle || this.angle < 0) {
            this.speed = -this.speed;
        }
    }
    
    private drawAxis(context: CanvasRenderingContext2D) {
        context.fillStyle = this.bgColor;
        context.fillRect(0, 0, this.canvasSin.nativeElement.width, this.canvasSin.nativeElement.height);
        
        // 画出x轴和y轴
        context.beginPath();
        context.strokeStyle = this.axisConfig.axisColor;
        const xStrat = new Point(this.axisConfig.origin.x, this.axisConfig.origin.y);
        const xEnd = new Point(this.axisConfig.origin.x + this.axisConfig.xlen, this.axisConfig.origin.y);
        const yStrat = new Point(this.axisConfig.origin.x, this.axisConfig.origin.y - Math.floor(this.axisConfig.ylen / 2));
        const yEnd = new Point(this.axisConfig.origin.x, yStrat.y + this.axisConfig.ylen);
        context.lineWidth = this.axisConfig.axisWidth;
        context.moveTo(xStrat.x, xStrat.y);
        context.lineTo(xEnd.x, xEnd.y);
        context.moveTo(yStrat.x, yStrat.y);
        context.lineTo(yEnd.x, yEnd.y);
        context.stroke();
        
        // 画出y轴和x轴的箭头。
        const radians = this.axisConfig.arrowAngle * Math.PI / 180;
        
        const d = this.axisConfig.arrowLen * Math.atan(radians);
        context.beginPath();
        context.moveTo(xEnd.x - this.axisConfig.arrowLen, xEnd.y - d);
        context.lineWidth = this.axisConfig.axisWidth;
        context.lineTo(xEnd.x, xEnd.y);
        context.lineTo(xEnd.x - this.axisConfig.arrowLen, xEnd.y + d);
        context.moveTo(yStrat.x + d, yStrat.y + this.axisConfig.arrowLen);
        context.lineTo(yStrat.x, yStrat.y);
        context.lineTo(yStrat.x - d, yStrat.y + this.axisConfig.arrowLen);
        context.stroke();
        context.closePath();
        
        // 在90，180， 270， 360处拓展出y轴的虚线
        const dashAngle = [90, 180, 270, 360];
        dashAngle.forEach(item => {
            context.font = '16px serif';
            context.fillStyle = this.axisConfig.axisColor;
            const metrics = context.measureText(item + '°');
            // 在固定点写入度数刻度
            context.fillText(item + '°', this.axisConfig.origin.x + item - (metrics.width / 2), this.axisConfig.origin.y + 20);
            // 画出虚线
            context.beginPath();
            context.strokeStyle = this.axisConfig.auxiliaryColor;
            // 控制虚线
            const times = Math.floor(this.axisConfig.ylen / 5);
            for (let i = 1; i <= times; i += 2) {
                context.moveTo(yStrat.x + item, yStrat.y + ((i - 1) * 5));
                context.lineTo(yStrat.x + item, yStrat.y + (i * 5));
            }
            context.stroke();
            context.closePath();
        });
        context.fillStyle = this.axisConfig.axisColor;
    }
}

