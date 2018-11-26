import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as d3 from 'd3';

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
        this.drawLine();
        this.circle();
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);
    }
    
    public drawLine() {
        
        const p = {
            x: 0,
            y: 0,
            z: 2,
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
        const points = curve.getPoints( 50 );
        // const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const curvedLine = this.createParticleSystem(geometry);
        curvedLine.name = 'line-1';
        console.log('curvedLine', curvedLine);
        this.scene.add(curvedLine);
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    
    private animate() {
        const line = this.scene.getObjectByName('line-1');
        const circle = this.scene.getObjectByName('line-1-circle');
        // 按照点的位置挪动圆
        this.i ++;
        if (this.i > line.geometry.attributes.position.count) {
            this.i = 0;
        }
        const position = {
            x: line.geometry.attributes.position.array[this.i * 3],
            y: line.geometry.attributes.position.array[this.i * 3 + 1],
            z: line.geometry.attributes.position.array[this.i * 3 + 2],
        };
        circle.position.set(position.x, position.y, position.z);
    
    }
    
    /**
     * 圆
     */
    circle() {
        const circleGeometry = new THREE.CircleGeometry(3);
        const circleMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
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
    
    private createParticleSystem(geom) {
        const material = new THREE.ParticleBasicMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: this.generaterSprite(),
        });
        const system = new THREE.ParticleSystem(geom, material);
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
        gradient.addColorStop(0.1, 'rgba(0, 0, 0, 1');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.node().width, canvas.node().height);
        const texture = new THREE.Texture(canvas.node());
        canvas.remove();
        texture.needsUpdate = true;
        return texture;
        
        
    }
    
}
