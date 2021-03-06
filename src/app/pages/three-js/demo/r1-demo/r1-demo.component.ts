import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';


import * as THREE from 'three';
import * as d3 from 'd3';
import * as geo from 'd3-geo';
import * as TWEEN from '@tweenjs/tween.js';

import {feature as topojsonFeature} from 'topojson';

const width = 2048;
const height = 1024;

const projection = geo.geoNaturalEarth1()
    .scale(325)
    .translate([width / 2, height / 2]);

@Component({
    selector: 'app-r1-demo',
    templateUrl: './r1-demo.component.html',
    styleUrls: ['./r1-demo.component.less']
})
export class R1DemoComponent implements OnInit, AfterViewInit {
    
    
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
    
    // 地图上定位的点
    pointArr = [];
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    
    ngAfterViewInit() {
        this.init();
        this.addPlane();
        this.axes();
        this.render();
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
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer.setClearColor(new THREE.Color(0x333333));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(80);
        this.scene.add(axes);
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
            this.plane.position.set(0, -160, 0);
            this.scene.add(this.plane);
            this.addCircle();
            const text = this.addText({x: 0, y: 200, z: 40}, 'r1', 'R1协议', {size: 40});
            this.scene.add( text );
    
            this.addLine();
        
        });
    }
    
    /**
     * 获得地图的json
     */
    async getJson() {
        const data = d3.json('/assets/data/world.json');
        return data;
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
            circle.name = 'p' + String(this.pointArr.length);
            this.pointArr.push(circle.name);
            this.scene.add(circle);
        }
        
    }
    
    /**
     * 创建文本，
     * @param position 文本的位置
     * @param name 索引的名字
     * @param text 文本内容
     * @param font 字体设置相关
     */
    addText(
        position: {x: number, y: number, z: number},
        name: string,
        text: string,
        font: {
            color?: string
            size?: number
            family?: string
        } = {
        },
    ) {
        const canvas = d3.select('body').append('canvas');
        const context = canvas.node().getContext('2d');
        const actualFontSize = font.size || 10;
        
        const textHeight = 400;
        context.font = textHeight + 'pt Arial';
        // 2d duty
        const textWidth = context.measureText(text).width;
        canvas.node().width = textWidth;
        canvas.node().height = textHeight;
        context.font = 'normal ' + textHeight + 'px ' + font.family || 'Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = font.color || '#ffffff';
        context.fillText(text, textWidth / 2, textHeight / 2);
        const texture = new THREE.Texture(canvas.node());
        canvas.remove();
        texture.needsUpdate = true;
        const material = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
        const sprite = new THREE.Sprite( material );
        
        const textObject = new THREE.Object3D();
        textObject.textHeight = actualFontSize;
        textObject.textWidth = (textWidth / textHeight) * textObject.textHeight;
        sprite.scale.set(textWidth / textHeight * actualFontSize, actualFontSize, 1);
    
        textObject.position.set(position.x, position.y, position.z);
        textObject.name = name;
        textObject.add(sprite);
        console.log('textObject', textObject);
        return textObject;
    }
    
    addLine() {
        const textR1 = this.scene.getObjectByName('r1');
        console.log('textR1', textR1);
        // 将点和文字连线
        const endPoint: THREE.Vector3 = new THREE.Vector3(
            0,
            textR1.position.y - (textR1.textHeight / 2),
            textR1.position.z
        );
        // 不动的线
        this.addBasicLine(endPoint);
        
        for (const name of this.pointArr) {
            const point = this.scene.getObjectByName(name).position;
            // 普通飞线
            // this.drawFlightLine(new THREE.Vector3(point.x, point.y, point.z), endPoint);
            // 流星线
            this.drawFlowStar(new THREE.Vector3(point.x, point.y, point.z), endPoint);
        }
    }
    
    /**
     * 基础画线
     * @param end
     */
    addBasicLine(end: THREE.Vector3) {
        
        const curveMaterial = new THREE.LineBasicMaterial({color: 0xFFFF00, linewidth: 10});
        for (const name of this.pointArr) {
            const start = this.scene.getObjectByName(name).position;
            const middle = new THREE.Vector3((start.x + end.x) / 2, end.y - 60, (start.z + end.z) / 2);
            const curve = new THREE.CatmullRomCurve3([
                start,
                middle,
                end,
            ]);
            const points = curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
            
            const curvedLine = new THREE.Line(geometry, curveMaterial);
            this.scene.add(curvedLine);
        }
    }
    
    /**
     * 画出流星效果
     * @param start
     * @param end
     */
    public drawFlowStar(start: THREE.Vector3, end: THREE.Vector3) {
    
        const middle = new THREE.Vector3((start.x + end.x) / 2, end.y - 60, (start.z + end.z) / 2);
        const curve = new THREE.CatmullRomCurve3([
            start,
            middle,
            end,
        ]);
        
        const points = curve.getPoints(64);
        
        const spriteMaterial = new THREE.SpriteMaterial({
            map: this.generaterSprite(),
            color: 0xffffff
        });
        
        const group = new THREE.Group();
        for (const point of points) {
            const particle = new THREE.Sprite(spriteMaterial);
            particle.position.set(point.x, point.y, point.z);
            particle.scale.x = particle.scale.y = 1;
            group.add(particle);
        }
        const number = group.children.length;
        
        const tween = new TWEEN.Tween({num: 0})
            .to({num: number}, 1800)
            .onUpdate(data => {
                const n = Math.floor(data.num);
                for (let index = 0; index < number; index++) {
                    if (index === n) {
                        try {
                            index += 8;
                            group.children[index].scale.set(9, 9, 1);
                            group.children[index - 1].scale.set(8, 8, 1);
                            group.children[index - 2].scale.set(7, 7, 1);
                            group.children[index - 3].scale.set(6, 6, 1);
                            group.children[index - 4].scale.set(5, 5, 1);
                            group.children[index - 5].scale.set(4, 4, 1);
                            group.children[index - 6].scale.set(3, 3, 1);
                            group.children[index - 7].scale.set(2, 2, 1);
                            group.children[index - 8].scale.set(1, 1, 1);
                        } catch (e) {
                        
                        }
                    } else {
                        group.children[index].scale.set(0.01, 0.01, 0.01);
                    }
                }
                
            });
        tween.repeat(Infinity);
        tween.start();
        this.scene.add(group);
    }
    
    /**
     * 飞线
     */
    public drawFlightLine(start: THREE.Vector3, end: THREE.Vector3) {
        const heightLimit = end.y - 60;
    
    
        const middleCurvePositionX = (start.x + end.x) / 2;
        const middleCurvePositionY = heightLimit;
        const middleCurvePositionZ = (start.z + end.z) / 2;
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(start.x, start.y, start.z),
            new THREE.Vector3(middleCurvePositionX, middleCurvePositionY, middleCurvePositionZ),
            new THREE.Vector3(end.x, end.y, end.z)
        ]);
        
        const points = curve.getPoints( 30 );
        const geometry = new THREE.Geometry();
        for (const point of points) {
            geometry.vertices.push(point);
            geometry.colors.push(
                new THREE.Color(0xffffff)
            );
        }
        
        const fligPointsMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            color: 0xffffff,
            size: 8,
        });
        
        const flightPoints = new THREE.Points(geometry, fligPointsMaterial);
        const number = flightPoints.geometry.colors.length;
        const tween = new TWEEN.Tween({num: 0})
            .to({num: number}, 3500)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(data => {
                const n = Math.floor(data.num);
                
                for (let index = 0; index < flightPoints.geometry.colors.length; index++) {
                    if (index === n) {
                        try {
                            flightPoints.geometry.colors[index].set(new THREE.Color(0xff0000));
                            flightPoints.geometry.colors[index + 1].set(new THREE.Color(0xaa0000));
                            flightPoints.geometry.colors[index + 2].set(new THREE.Color(0x550000));
                            flightPoints.geometry.colors[index + 3].set(new THREE.Color(0xaa0000));
                            flightPoints.geometry.colors[index + 4].set(new THREE.Color(0xff0000));
                            index += 4;
                        } catch (e) {
                        
                        }
                    } else {
                        flightPoints.geometry.colors[index].set(new THREE.Color(0xffffff));
                    }
                }
                
                flightPoints.geometry.colorsNeedUpdate = true;
            });
        
        tween.repeat(Infinity);
        tween.start();
        this.scene.add(flightPoints);
        
        
    }
    
    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.animate();
    }
    
    private animate() {
        TWEEN.update();
    }
    
    /**
     * 通过geo地图获取到canvas里面的地图
     * @param geojson
     * @param color
     */
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
    
    /**
     * 飞线的材质
     */
    private generaterSprite() {
        const canvas = d3.select('body').append('canvas');
        const context = canvas.node().getContext('2d');
        canvas.node().width = 32;
        canvas.node().height = 32;
        const gradient = context.createRadialGradient(
            canvas.node().width / 2,
            canvas.node().height / 2,
            0,
            canvas.node().width / 2,
            canvas.node().height / 2,
            canvas.node().width / 2,
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1');
        gradient.addColorStop(0.2, 'rgba(0, 255, 255, 1');
        gradient.addColorStop(0.4, 'rgba(0, 0, 64, 1');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 1');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.node().width, canvas.node().height);
        const texture = new THREE.Texture(canvas.node());
        canvas.remove();
        texture.needsUpdate = true;
        return texture;
    }
    
}
