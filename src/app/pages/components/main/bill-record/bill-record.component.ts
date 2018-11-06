import {Component, OnInit} from '@angular/core';

import * as G2 from '@antv/g2';

import * as EChart from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import {HttpClient} from '@angular/common/http';

export interface ChartInterface {
    // x轴名称
    xAxis: string[];
    // y轴数据
    series: number[];
}
@Component({
    selector: 'app-bill-record',
    templateUrl: './bill-record.component.html',
    styleUrls: ['./bill-record.component.less']
})
export class BillRecordComponent implements OnInit {
    
    
    chartData: { id: string, data: ChartInterface, total?: string }[] = [
        {
            id: 'c1',
            data: {
                xAxis: [],
                series: [],
            },
        },
        {
            id: 'c2',
            data: {
                xAxis: [],
                series: [],
            }
        },
        {
            id: 'c3',
            data: {
                xAxis: [],
                series: [],
            }
        },
        {
            id: 'c4',
            data: {
                xAxis: [],
                series: [],
            }
        },
        {
            id: 'c5',
            data: {
                xAxis: [],
                series: [],
            }
        },
    ];
    
    constructor(
        private http: HttpClient,
    ) {
    
    }
    
    ngOnInit() {
        this.http.get('/assets/data/alipay-record.csv', {
            responseType: 'text',
        }).subscribe(res => {
            // 处理数据
            res.split('\n').forEach(item => {
                const itemArr = item.split(',').map(i => {
                    return i.trim();
                });
                // 抽取金额：10、收支：11、商品名称：9，交易对方：8
                if (itemArr[10] === '支出' && itemArr[8] !== '转账') {
                    const money = Number(itemArr[9]);
                    if (money > 1000) {
                        this.chartData[0].data.series.push(Number(itemArr[9]));
                        this.chartData[0].data.xAxis.push(itemArr[8]);
                    } else if (money <= 1000 && money > 500) {
                        this.chartData[1].data.series.push(Number(itemArr[9]));
                        this.chartData[1].data.xAxis.push(itemArr[8]);
                    } else if (money <= 500 && money > 100) {
                        this.chartData[2].data.series.push(Number(itemArr[9]));
                        this.chartData[2].data.xAxis.push(itemArr[8]);
                    } else if (money <= 100 && money > 50) {
                        this.chartData[3].data.series.push(Number(itemArr[9]));
                        this.chartData[3].data.xAxis.push(itemArr[8]);
                    } else if (money <= 50) {
                        this.chartData[4].data.series.push(Number(itemArr[9]));
                        this.chartData[4].data.xAxis.push(itemArr[8]);
                    }
                }
            });
            
            for (const item of this.chartData) {
                // 计算总价
                item.total = item.data.series.reduce((sum, i) => {
                    return sum += i;
                }).toFixed(2);
                this.drawEchart(item.id, item.data);
                console.log(JSON.stringify(item.data));
            }
            
            console.log(this.chartData);
            
        });
    }
    
    drawEchart(id, data: ChartInterface) {
        const myChart = EChart.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                formatter: '{b0}<br />money: {c0} 元'
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
    
    getTotal(): string {
        let sum = 0;
        this.chartData.forEach(i => {
            sum += Number(i.total);
        });
        return sum.toFixed(2);
    }
    
    
}
