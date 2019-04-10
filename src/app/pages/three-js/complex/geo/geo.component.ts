import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as d3 from 'd3';
import * as geo from 'd3-geo';
import {feature as topojsonFeature} from 'topojson';

const width = 2048;
const height = 1024;

const projection = geo.geoNaturalEarth1()
    .scale(325)
    .translate([width / 2, height / 2]);



@Component({
    selector: 'app-geo',
    templateUrl: './geo.component.html',
    styleUrls: ['./geo.component.less']
})
export class GeoComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    
    plane: THREE.Mesh;
    
    planeWidth = 1200;
    planeHeight = 600;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.init();
        this.axes();
        this.addPlane();
        this.render();
        
        
    }
    
    
    addPlane() {
        const planeGeometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight);
        this.getJson().then(data => {
            const countries = topojsonFeature(data, data['objects']['countries']);
            const worldTexture = this.mapTexture(countries, '#000000');
            const planeMaterial = new THREE.MeshBasicMaterial({
                map: worldTexture,
                transparent: true,
                color: 0xffffff,
                // wireframe: true,
    
            });
            this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
            // this.plane.rotation.x = 0.1 * Math.PI;
            this.plane.position.set(0, -160, 0);
            this.scene.add(this.plane);
            this.addCircle();
            this.render();
            
        });
        
    }
    
    addCircle() {
        
        const circleMaterial = new THREE.MeshBasicMaterial({
            color: 0xFF0000,
        });
        
        const citys = [
            {
                name: '北京',
                lat: 39.9075,   // 经纬度查询请到 http://www.gpsspg.com/maps.htm
                lon: 116.39723
            },
            {
                name: '东京',
                lat: 35.6895,
                lon: 139.69171,
            },
            {
                name: 'New York',
                lat: 40.71427,
                lon: -74.0059
            },
            {
                name: 'Moscow',
                lat: 55.75222,
                lon: 37.61556
            }
        ];
        
        for (const item of citys) {
            const circleGeometry = new THREE.CircleGeometry(3, 20);
            
            const peking = [item.lon, item.lat];
            const proPeking = projection(peking);
            const x = ((this.planeWidth / width) * proPeking[0]) - (this.planeWidth / 2) + this.plane.position.x;
            const y = this.planeHeight / 2 - ((this.planeWidth / width) * proPeking[1]) + this.plane.position.y;
            console.log('x, y', x, y);
            const circle = new THREE.Mesh(circleGeometry, circleMaterial);
            circle.position.set(x, y, 1);
            this.scene.add(circle);
        }
        
    }
    
    async getJson() {
        const data = d3.json('/assets/data/world.json');
        return data;
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(80);
        this.scene.add(axes);
    }
    
    
    init() {
        // this.context = this.canvas.getContext('2d');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.camera.position.set(0, 0, 1000);
        this.camera.lookAt(this.scene.position);
        this.renderer.setClearColor(new THREE.Color(0x000000));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }
    
    public render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    
    mapTexture(geojson, color) {
        let texture, context, canvas;
        
        canvas = d3.select('body').append('canvas')
        // .style('display', 'none')
            .attr('width', width + 'px')
            .attr('height', height + 'px');
        
        context = canvas.node().getContext('2d');
        
        const path = geo.geoPath(projection, context);
        
        context.strokeStyle = '#ffffff';
        context.lineWidth = 2;
        context.fillStyle = color || '#CDB380';
        
        context.beginPath();
        
        path(geojson);
        
        if (color) {
            context.fill();
        }
        
        context.stroke();
        
        // DEBUGGING - Really expensive, disable when done.
        // console.log(canvas.node().toDataURL());
        
        texture = new THREE.Texture(canvas.node());
        texture.needsUpdate = true;
        
        canvas.remove();
        
        return texture;
    }
    
}
