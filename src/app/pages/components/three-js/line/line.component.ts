import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as d3 from 'd3';
import * as TWEEN from '@tweenjs/tween.js';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.less']
})
export class LineComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.RenderElement;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    cube: THREE.Mesh;
    
    line: THREE.Points;
    
    tween: TWEEN;
    
    i = 0;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    
    constructor() {
    }
    
    ngOnInit() {
    
    }
    
    ngAfterViewInit() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.render(this.scene, this.camera);
        
        
        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(0, 0, 0);
        this.axes();
        this.drawFlightLine();
        // this.drawLine();
        this.drawParticleLine();
        this.drawFlowStar();
        // this.circle();
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);
    }
    
    /**
     * 画出流星效果
     */
    public drawFlowStar() {
        const start = new THREE.Vector3(-100, -20, -10);
        const end = new THREE.Vector3(0, 20, 20);
        
        const curve = new THREE.CatmullRomCurve3([
            start,
            end,
        ]);
        
        const points = curve.getPoints(64);
        
        const spriteMaterial = new THREE.SpriteMaterial({map: this.generaterSprite(), color: 0xffffff});
        
        const group = new THREE.Group();
        for (const point of points) {
            const particle = new THREE.Sprite(spriteMaterial);
            particle.position.set(point.x, point.y, point.z);
            particle.scale.x = particle.scale.y = Math.random() * 4 + 2;
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
                            index += 4;
                            group.children[index].scale.set(3, 3, 1);
                            group.children[index - 1].scale.set(2.5, 2.5, 1);
                            group.children[index - 2].scale.set(2, 2, 1);
                            group.children[index - 3].scale.set(1.5, 1.5, 1);
                            group.children[index - 4].scale.set(1, 1, 1);
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
     * 正弦运动函数
     * @param x
     */
    fsin(x) {
        return 50 * Math.sin(0.8 * x * Math.PI / 180);
    }
    
    /**
     * 画出粒子系统线段
     */
    public drawParticleLine() {
        const start = new THREE.Vector3(-60, -20, -10);
        const end = new THREE.Vector3(20, 20, 20);
        
        const curve = new THREE.CatmullRomCurve3([
            start,
            end,
        ]);
        const points = curve.getPoints(30);
        const geometry = new THREE.Geometry();
        for (const point of points) {
            geometry.vertices.push(point);
        }
        
        this.line = this.createParticleSystem(geometry);
        console.log('line', this.line);
        this.scene.add(this.line);
        
    }
    
    /**
     * 飞线
     */
    public drawFlightLine() {
        const start = new THREE.Vector3(-20, -40, -10);
        const end = new THREE.Vector3(40, 40, 10);
        
        const curve = new THREE.CatmullRomCurve3([
            start,
            end,
        ]);
        
        const points = curve.getPoints(30);
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
            size: 1,
        });
        
        const flightPoints = new THREE.Points(geometry, fligPointsMaterial);
        const number = flightPoints.geometry.colors.length;
        this.tween = new TWEEN.Tween({num: 0})
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
        
        this.tween.repeat(Infinity);
        this.tween.start();
        this.scene.add(flightPoints);
        
        
    }
    
    
    /**
     * 普通线段
     */
    public drawLine() {
        
        const p = {
            x: 0,
            y: 0,
            z: 0,
        };
        const point = {
            x: -40,
            y: -40,
            z: 0,
        };
        const endPoint = {
            x: 0,
            y: 40,
            z: 0
        };
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(point.x, point.y, point.z),
            new THREE.Vector3(p.x, p.y, p.z),
            new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z),
        );
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const curveMaterial = new THREE.LineBasicMaterial({
            color: Math.random() * 0xffffff,
            linewidth: 20
        });
        // const curvedLine = this.createParticleSystem(geometry);
        const curvedLine = new THREE.Line(geometry, curveMaterial);
        
        // curvedLine.scale.setScalar(2);
        curvedLine.name = 'line-1';
        this.scene.add(curvedLine);
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    
    private animate() {
        TWEEN.update();
        
    }
    
    /**
     * 圆
     */
    circle() {
        const circleGeometry = new THREE.CircleGeometry(3);
        const circleMaterial = new THREE.MeshBasicMaterial({
            map: this.generaterSprite(),
            transparent: true,
        });
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.name = 'line-1-circle';
        const line = this.scene.getObjectByName('line-1');
        
        const position = {
            x: line.geometry.attributes.position.array[this.i * 3],
            y: line.geometry.attributes.position.array[this.i * 3 + 1],
            z: line.geometry.attributes.position.array[this.i * 3 + 2] + 1,
        };
        circle.position.set(position.x, position.y, position.z);
        this.scene.add(circle);
        
    }
    
    private createParticleSystem(geom): THREE.Points {
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: this.generaterSprite(),
        });
        const system = new THREE.Points(geom, material);
        system.sortParticles = true;
        return system;
    }
    
    private generaterSprite() {
        const canvas = d3.select('body').append('canvas');
        const context = canvas.node().getContext('2d');
        canvas.node().width = 16;
        canvas.node().height = 16;
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
