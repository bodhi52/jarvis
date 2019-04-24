import Point from './point';

export default class Canvas {
    static drawCycle(context, point: Point, radius: number = 2, color: string = 'red') {
        context.beginPath();
        context.fillStyle = color;
        context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}
