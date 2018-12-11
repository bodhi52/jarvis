import {Component, OnInit} from '@angular/core';

import * as EChart from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {ChartInterface} from '../../../../core/interface/echart.interface';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-wxpay',
    templateUrl: './wxpay.component.html',
    styleUrls: ['./wxpay.component.less']
})
export class WxpayComponent implements OnInit {
    chartData: { id: string, data: ChartInterface, total?: number, inTotal: number, outTotal: number, balance: 0, } = {
        id: 'c1',
        total: 0,
        inTotal: 0,
        outTotal: 0,
        balance: 0,
        data: {
            xAxis: [],
            series: [],
            name: [],
        },
    };
    
    
    constructor(
        private http: HttpClient,
    ) {
    }
    
    ngOnInit() {
        this.http.get('/assets/data/wx-record.csv', {
            responseType: 'text',
        }).subscribe(res => {
            const arr = res.split('\n');
            for (let i = arr.length - 1; i > 0; i -= 3) {
                const money = Number(arr[i].replace(' ', ''));
                if (money > 0) {
                    this.chartData.inTotal += money;
                } else {
                    this.chartData.data.xAxis.push(arr[i - 1]);
                    this.chartData.data.series.push(money);
                    this.chartData.data.name.push(arr[i - 2]);
                    this.chartData.outTotal += money;
                }
                this.chartData.balance += money;
                
            }
            this.drawEchart(this.chartData.id, this.chartData.data);
        });
    }
    
    drawEchart(id, data: ChartInterface) {
        const myChart = EChart.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                // formatter: '{a0}<br />{b0}<br />money: {c0} 元'
                formatter: (item) => {
                    let res = '';
                    res += this.chartData.data.name[item['dataIndex']] + '<br/>';
                    res += '时间：' + item['name'] + '<br/>';
                    res += item['seriesName'] + '：' + item['value'].toFixed(2) + ' 元<br/>';
                    return res;
                }
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '金额',
                type: 'bar',
                data: data.series,
            }]
        });
    }
    
}
