import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as Stats from 'stats-js';
import * as DAT from 'dat.gui';

@Component({
    selector: 'app-three-dimensional-scene',
    templateUrl: './three-dimensional-scene.component.html',
    styleUrls: ['./three-dimensional-scene.component.less']
})
export class ThreeDimensionalSceneComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.WebGLRenderer;

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    cube: THREE.Mesh;

    sphere: THREE.Mesh;

    step = 0;

    gui: DAT.GUI;

    controls = {
        rotationSpeed: 0.02,
        bouncingSpeed: 0.03,
    };

    stats: Stats;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.gui = new DAT.GUI();
        this.gui.add(this.controls, 'rotationSpeed', 0, 0.5);
        this.gui.add(this.controls, 'bouncingSpeed', 0, 0.5);
        this.init();
        this.initStats();
        this.render();

    }
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        
        this.axes();
        this.plane();
        this.addCube();
        this.addSphere();
        this.light();
        
        this.camera.position.set(-50, 40, 30);
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * 灯光
     * 基础材质（MeshBasicMaterial）只会以指定颜色渲染物体，对光源不反应
     * 对光源产生反应的材质：MeshLambertMaterial和MeshPhongMaterial
     */
    light() {
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        this.scene.add(spotLight);
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(100);
        this.scene.add(axes);
    }
    
    /**
     * 平面
     */
    plane() {
        const planeGeometry = new THREE.PlaneGeometry(60, 20);
        const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;
        this.scene.add(plane);
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
        this.cube.castShadow = true;
        this.scene.add(this.cube);
    }
    
    /**
     * 球体
     */
    addSphere() {
        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        // const sphereMaterial = new THREE.MeshBasicMaterial({
        //     color: 0x777777,
        //     wireframe: true,
        // });
        //
        const sphereMaterial = new THREE.MeshLambertMaterial({
            color: 0x7777ff
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.castShadow = true;
        this.sphere.position.set(20, 4, 2);
        console.log('sphere');
        this.scene.add(this.sphere);
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
    
    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.animate();
        
    }
    
    private animate() {
        // this.stats.update();
        // this.cube.rotation.x += this.controls.rotationSpeed;
        // this.cube.rotation.y += this.controls.rotationSpeed;
        // this.cube.rotation.z += this.controls.rotationSpeed;
        //
        // this.step += this.controls.bouncingSpeed;
        // this.sphere.position.x = 20 + (10 * (Math.cos(this.step)));
        // this.sphere.position.y = 2 + (10 * (Math.abs((Math.sin(this.step)))));
    }
    
}
