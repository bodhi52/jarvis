import Point from './point';

export default class BezierLine {
    
    middle: Point;
    
    start: Point;
    end: Point;
    length: number;
    
    private A: number;
    private B: number;
    private C: number;
    
    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
        this.getMiddlePoint();
    }
    
    /**
     * 获得平方贝塞尔曲线的控制点
     */
    private getMiddlePoint() {
        // 平方贝塞尔曲线的点
        this.middle = new Point(
            (this.start.x + this.end.x) / 2 - (this.start.y - this.end.y) * 0.4,
            (this.start.y + this.end.y) / 2 - (this.end.x - this.start.x) * 0.4,
        );
        const ax = this.start.x - 2 * this.middle.x + this.end.x;
        const ay = this.start.y - 2 * this.middle.y + this.end.y;
        const bx = 2 * this.middle.x - 2 * this.start.x;
        const by = 2 * this.middle.y - 2 * this.start.y;
        this.A = 4 * (ax * ax + ay * ay);
        this.B = 4 * (ax * bx + ay * by);
        this.C = bx * bx + by * by;
    }
    
    /**
     * 获得贝塞尔曲线上的点
     * B(t) = (1 - t)^2 * P0 + 2t * (1 - t) * P1 + t^2 * P2, t ∈ [0,1]
     * @param t  曲线长度比例
     */
    public calculateBezierPointForQuadratic(t): Point {
        const temp = 1 - t;
        return new Point(
            temp * temp * this.start.x + 2 * t * temp * this.middle.x + t * t * this.end.x,
            temp * temp * this.start.y + 2 * t * temp * this.middle.y + t * t * this.end.y
        );
    }
    
    public getLength(t: number): number {
        
        
        
        const temp1 = Math.sqrt(this.C + t * (this.B + this.A * t));
        
        const temp2 = (2 * this.A * t * temp1 + this.B * (temp1 - Math.sqrt(this.C)));
        
        const temp3 = Math.log(this.B + 2 * Math.sqrt(this.A) * Math.sqrt(this.C));
        
        const temp4 = Math.log(this.B + 2 * this.A * t + 2 * Math.sqrt(this.A) * temp1);
        
        const temp5 = 2 * Math.sqrt(this.A) * temp2;
        
        const temp6 = (this.B * this.B - 4 * this.A * this.C) * (temp3 - temp4);
        
        return (temp5 + temp6) / (8 * Math.pow(this.A, 1.5));
        
    }
    
    /**
     * 根据泛函数求得对应的t值
     * @param t
     * @param l
     */
    public invertL(t, l) {
        
        let t1 = t, t2;
        
        do {
            t2 = t1 - (this.getLength(t1) - l) / this.s(t1);
            
            if (Math.abs(t1 - t2) < 0.000001) {
                break;
            }
            t1 = t2;
            
        } while (true) ;
        
        return t2;
    }
    
    
    private s(t) {
        return Math.sqrt(this.A * t * t + this.B * t + this.C);
    }
}
