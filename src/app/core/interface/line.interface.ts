import BezierLine from '../../util/bezier-line';
import Point from '../../util/point';

export interface LineObjInterface {
    // 白塞尔曲线对象
    line: BezierLine;
    // 曲线上的点的集合
    pointArr: Point[];
    // 曲线的长度
    len?: number;
    // 运动的速率
    speed?: number;
    cursor?: number; // 当前这条线的头部位置索引
    // 一个周期否运动完成
    isComplete?: boolean;
    // 城市点的alpha通道
    cityAlpha?: number;
    // 放大的倍率
    scale?: number;
}
