import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';

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
    context: CanvasRenderingContext2D;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    
    ngAfterViewInit() {
        this.init();
        this.addPlane();
        this.axes();
        this.addText();
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
        this.camera.position.set(0, 0, 200);
        this.camera.lookAt(this.scene.position);
        this.renderer.setClearColor(new THREE.Color(0x333333));
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
        const planeGeometry = new THREE.PlaneGeometry(100, 40);
        const texture = new THREE.TextureLoader().load('/assets/img/earth4.jpg');
        // const bumpMap = THREE.ImageUtils.loadTexture('/assets/img/earth4.jpg');
        
        const planeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.rotation.x = -0.5 * Math.PI;
        plane.rotation.x = -0.2 * Math.PI;
        plane.position.set(0, -20, 0);
        console.log(plane);
        this.scene.add(plane);
    }
    
    addText() {
    
        const loader = new THREE.FontLoader();
    
        loader.load( '/assets/fonts/helvetiker_bold.typeface.json',  ( font ) => {
        
            const textGeo = new THREE.TextGeometry( 'LABCDEF', {
                font: font,
                size: 10,
                height: 2,
                curveSegments: 1,
    
                bevelThickness: 2,
                bevelSize: 5,
                bevelEnabled: true
            
            } );
            
        
            const textMaterial = new THREE.MeshBasicMaterial( {
                color: 0xbbbbbb,
                // wireframe: true,
            } );
        
            const mesh = new THREE.Mesh( textGeo, textMaterial );
            // mesh.rotation.x = 0.2 * Math.PI;
            mesh.position.set(10, 30, 10);
        
            this.scene.add( mesh );
        
        } );
    }
    
   
    
    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.animate();
    }
    
    private animate() {
    }
    
}
