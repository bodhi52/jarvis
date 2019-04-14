import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'createdTime'
})
export class CreatedTimePipe implements PipeTransform {
    private minute = 1000 * 60;
    private hour = this.minute * 60;
    private day = this.hour * 24;
    private month = this.day * 30;
    
    transform(value: any, args?: any): any {
        return this.diffTime(value);
    }
    
    private diffTime(dateTimeStamp) {
        const now = new Date().getTime();
        const diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            return '';
        }
        const monthC = diffValue / this.month;
        const weekC = diffValue / (7 * this.day);
        const dayC = diffValue / this.day;
        const hourC = diffValue / this.hour;
        const minC = diffValue / this.minute;
        let result;
        if (monthC >= 1) {
            result = Math.floor(monthC) + '个月前';
        } else if (weekC >= 1) {
            result = Math.floor(weekC) + '周前';
        } else if (dayC >= 1) {
            result = Math.floor(dayC) + '天前';
        } else if (hourC >= 1) {
            result = Math.floor(hourC) + '个小时前';
        } else if (minC >= 1) {
            result = Math.floor(minC) + '分钟前';
        } else {
            result = '刚刚';
        }
        return result;
    }
}
