import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as Stats from 'stats-js';

@Component({
    selector: 'app-scene',
    templateUrl: './scene.component.html',
    styleUrls: ['./scene.component.less']
})
export class SceneComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    stats: Stats;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    
    planeGeometry: THREE.PlaneGeometry;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.init();
        this.initStats();
        this.addPlane();
        this.addLight();
        this.addSpotLight();
        this.axes();
        this.render();
    }
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.camera.position.set(-50, 40, 30);
        this.camera.lookAt(this.scene.position);
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(30);
        this.scene.add(axes);
    }
    
    addPlane() {
        this.planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
        const planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x333333
        });
        const plane = new THREE.Mesh(this.planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(0, 0, 0);
        this.scene.add(plane);
    }
    
    addLight() {
        const ambientLight = new THREE.AmbientLight(0x0c0c0c);
        this.scene.add(ambientLight);
    }
    
    addSpotLight() {
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        this.scene.add(spotLight);
    }
    
    addCube() {
        const cubeSize = Math.ceil(Math.random() * 3);
        const cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMaterial = new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.name = 'cube-' + this.scene.children.length;
        cube.position.x = -30 + Math.round(Math.random() * this.planeGeometry.parameters.width);
        console.log('this.planeGeometry.width', this.planeGeometry.parameters.width);
        cube.position.y = Math.round(Math.random() * 5);
        cube.position.z = -20 + Math.round(Math.random() * this.planeGeometry.parameters.height);
        console.log(cube);
        this.scene.add(cube);
        this.render();
    }
    
    removeCube() {
        const lastCube = this.scene.children[this.scene.children.length - 1];
        if (lastCube instanceof THREE.Mesh) {
            this.scene.remove(lastCube);
            this.render();
        }
    }
    
    public render() {
        this.scene.fog = new THREE.FogExp2(0xffffff, 0.015);
        this.scene.overrideMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
        });
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * 初始化监控fps
     */
    public initStats() {
        this.stats = new Stats();
        this.stats.setMode(1); // 0: fps, 1: ms
        
        // Align top-right
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.right = '0px';
        this.stats.domElement.style.top = '0px';
        
        document.body.appendChild( this.stats.domElement );
        
        this.stats.begin();
    }
    
}
