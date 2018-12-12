import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as d3 from 'd3';
import * as geo from 'd3-geo';
import * as d3Color from 'd3-scale-chromatic';

const width = 1024;
const height = 600;

const projection = geo.geoMercator()
    .scale(550)
    .center([105, 38])
    .translate([width / 2, height / 2]);

@Component({
    selector: 'app-china-map',
    templateUrl: './china-map.component.html',
    styleUrls: ['./china-map.component.less']
})
export class ChinaMapComponent implements OnInit, AfterViewInit {
    @ViewChild('svg')
    private el: ElementRef;
    
    private get svg(): HTMLCanvasElement {
        return this.el.nativeElement;
    }
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    
    ngAfterViewInit() {
        
        this.drawMapSvg();
        
    }
    
    async getJson() {
        const data = d3.json('/assets/data/china.geo.json');
        return data;
    }
    
    drawMapSvg() {
        // 9个自然颜色
        // const colors = d3.scaleOrdinal(d3Color.schemePaired);
        // 单一颜色过度
        // const colors = d3.scaleOrdinal(d3Color.schemeOranges[9]);
        //
        const colors = d3.scaleOrdinal(d3Color.schemeBrBG[11]);
        // 路径生成器
        const path = geo.geoPath(projection);
        
        const svg = d3.select('#svg')
            .attr('width', width)
            .attr('height', height);
        this.getJson().then(data => {
            svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path').attr('d', path)
                .attr('fill', (d, i) => {
                    return colors(i);
                })
                .attr('stroke', 'rgba(255, 255, 255, 1')
                .attr('stroke-width', 1);
            
            const places = [
                {
                    'name': '北京',
                    'log': '116.3',
                    'lat': '39.9'
                },
                {
                    'name': '上海',
                    'log': '121.4',
                    'lat': '31.2'
                },
                {
                    'name': '深圳',
                    'log': '113',
                    'lat': '22'
                }
            ];
            const tooltip = d3.select('#tooltip');
            
            const location = svg.selectAll('.location')
                .data(places)
                .enter()
                .append('g')
                .attr('class', 'location')
                .attr('transform', (d) => {
                    const coor = projection([d.log, d.lat]);
                    return 'translate(' + coor[0] + ',' + coor[1] + ')';
                });
            
            location.append('circle')
                .attr('r', 4)
                .attr('fill', '#e91e63')
                .attr('class', 'location');
            
            location.on('mouseover', function (d) {
                tooltip.html('当前城市：' + d.name)
                    .style('left', d3.event.pageX + 20 + 'px')
                    .style('top', d3.event.pageY + 20 + 'px')
                    .style('opacity', 1);
                d3.select(this).select('circle').transition()
                    .duration(150)
                    .attr('r', 8);
            }).on('mouseout', function () {
                tooltip.style('opacity', 0);
                d3.select(this)
                    .select('circle')
                    .transition()
                    .duration(150)
                    .attr('r', 4);
            });
        });
    }
    
}
