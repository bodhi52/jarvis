import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as d3 from 'd3';
import * as geo from 'd3-geo';
import * as d3Color from 'd3-scale-chromatic';

const width = 1200;
const height = 1000;

const projection = geo.geoMercator()
    .scale(1050)
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
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    
    ngAfterViewInit() {
        
        this.drawMapSvg();
        
    }
    
    async getJson() {
        return d3.json('/assets/data/china.geo.json');
    }
    
    drawMapSvg() {
        // 9个自然颜色
        // const colors = d3.scaleOrdinal(d3Color.schemePaired);
        // 单一颜色过度
        // const colors = d3.scaleOrdinal(d3Color.schemeOranges[9]);
        //
        const colors = d3.scaleOrdinal(d3Color.schemeBrBG[11]);
        console.log('colors', colors);
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
                .attr('stroke-width', 2);
            
            const places = [
                {
                    name: '西双版纳机场-嘎洒机场',
                    log: 100.770921,
                    lat: 21.977896,
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
                tooltip.html(d.name)
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
