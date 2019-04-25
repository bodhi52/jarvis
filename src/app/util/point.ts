export default class Point {
    public x: number;
    public y: number;
    
    /**
     * 返回两点间的距离
     * @param p1
     * @param p2
     */
    static distance(p1: Point, p2: Point) {
        return Math.floor(Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)));
    }
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    
}
