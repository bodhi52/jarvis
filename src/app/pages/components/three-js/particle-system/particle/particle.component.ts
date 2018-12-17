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
        this.createParticle();
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);
    }
    
    createBasicParticle() {
        const material = new THREE.PointsMaterial();
        for (let x = -5; x < 5; x++) {
            for (let y = -5; y < 5; y++) {
                const particle = new THREE.Particle(material);
                particle.position.set(x * 10, y * 10, 0);
                this.scene.add(particle);
            }
        }
    }
    
    createParticleSystem() {
        const geom = new THREE.Geometry();
        const material = new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            color: 0xffffff,
        });
        
        for (let x = -5; x < 5; x ++) {
            for (let y = -5; y < 5; y ++) {
                const particle = new THREE.Vector3(x * 10, y * 10, 0);
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xFFFFFF)
                );
            }
        }
        
        const system = new THREE.ParticleSystem(geom, material);
        this.scene.add(system);
    }
    
    createParticle() {
         const geom = new THREE.Geometry();
         const material = new THREE.PointsMaterial({
             size: 4,
             transparent: true,
             opacity: 1,
             vertexColors: 0xffffff,
             sizeAttenuation: true,
             color: 0xFFFFFF,
         });
         
         const range = 50;
         
         for (let i = 0; i < 20; i ++) {
             const particle = new THREE.Vector3(
                 Math.random() * range - range / 2,
                 Math.random() * range - range / 2,
                 Math.random() * range - range / 2
             );
             geom.vertices.push(particle);
             const color = new THREE.Color(0x00ff00);
             const hsl = {
                 h: 0,
                 s: 0,
                 l: 0,
             };
             color.getHSL(hsl);
             
             color.setHSL(hsl.h, hsl.s, Math.random() * hsl.l);
             geom.colors.push(color);
         }
         const system = new THREE.Points(geom, material);
         this.scene.add(system);
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        // window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    
    private animate() {
    }
    
}
