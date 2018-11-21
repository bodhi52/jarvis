import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as Stats from 'stats-js';

@Component({
    selector: 'app-geometry-shape',
    templateUrl: './geometry-shape.component.html',
    styleUrls: ['./geometry-shape.component.less']
})
export class GeometryShapeComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.WebGLRenderer;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    cube: THREE.Mesh;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.init();
        this.initStats();
    }
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        
        this.axis();
        this.plane();
        this.addCube();
        this.sphere();
        this.circle();
        
        this.camera.position.set(-50, 40, 30);
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * 坐标轴
     */
    axis() {
        const axis = new THREE.AxesHelper(20);
        this.scene.add(axis);
        
    }
    
    /**
     * 平面
     */
    plane() {
        const planeGeometry = new THREE.PlaneGeometry(60, 40, 16, 16);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
            wireframe: true,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        this.scene.add(plane);
    }
    
    /**
     * 圆
     */
    circle() {
        const circleGeometry = new THREE.CircleGeometry(3);
        const circleMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
        });
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.set(-30, 10, 0);
        circle.rotation.x = -0.5 * Math.PI;
        this.scene.add(circle);
        
        const halfCircleGeometry = new THREE.CircleGeometry(3, 12, 0, Math.PI);
        const halfCircle = new THREE.Mesh(halfCircleGeometry, circleMaterial);
        halfCircle.position.set(-20, 10, 0);
        halfCircle.rotation.x = -0.5 * Math.PI;
        this.scene.add(halfCircle);
        
    }
    
    shape() {
        const shape = new THREE.Shape();
    }
    
    /**
     * 方体
     */
    addCube() {
        const cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
        const cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0x333333,
        });
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.position.set(-4, 3, 0);
        this.scene.add(this.cube);
    }
    
    /**
     * 球体
     */
    sphere() {
        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x777777,
            wireframe: true,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(20, 4, 2);
        this.scene.add(sphere);
    }
    
    /**
     * 初始化监控fps
     */
    public initStats() {
        const stats = new Stats();
        stats.setMode(1); // 0: fps, 1: ms
    
        // Align top-right
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.right = '0px';
        stats.domElement.style.top = '0px';
    
        console.log(stats.domElement);
        document.body.appendChild( stats.domElement );
    
        setInterval( function () {
        
            stats.begin();
        
            // your code goes here
        
            stats.end();
        
        }, 1000 / 60 );
    }
    
 
}
