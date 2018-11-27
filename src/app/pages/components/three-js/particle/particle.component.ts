import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';


@Component({
    selector: 'app-particle',
    templateUrl: './particle.component.html',
    styleUrls: ['./particle.component.less']
})
export class ParticleComponent implements OnInit, AfterViewInit {
    
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
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        // window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    
    private animate() {
    }
    
}
