import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import {current} from '../../../../../../node_modules/codelyzer/util/syntaxKind';
import {P} from '../../../../../../node_modules/@angular/core/src/render3';

@Component({
    selector: 'app-cube',
    templateUrl: './cube.component.html',
    styleUrls: ['./cube.component.less']
})
export class CubeComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.RenderElement;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    cube: THREE.Mesh;
    
    currentTime: number = Date.now();
    
    light: THREE.DirectionalLight;
    
    // ms
    duration = 5000;
    
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
        console.log(this.canvas.width);
        console.log(this.canvas.height);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.render(this.scene, this.camera);
        this.camera.position.z = 5;
        this.addLight();
        this.drawCube();
        this.render();
    }
    
    public addLight() {
        this.light = new THREE.DirectionalLight(0xffffbb, 1.5);
        this.light.position.set(0, 0, 1);
        this.scene.add(this.light);
    }
    
    public drawCube() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        // 使用图片创建一个纹理映射
        const mapUrl = '../../../../../assets/img/tony.jpeg';
        const map = THREE.ImageUtils.loadTexture(mapUrl);
        const material = new THREE.MeshBasicMaterial({map: map});
        this.cube = new THREE.Mesh(geometry, material);
        
        this.scene.add(this.cube);
    }
    
    public render() {
    
        window.requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.animate();
        
    }
    
    private animate() {
    
        const now = Date.now();
        
        const deltat = now - this.currentTime;
        this.currentTime = now;
        const fract = deltat / this.duration;
        const angle = Math.PI * 2 * fract;
        this.cube.rotation.y += angle;
    }
    
    
}
