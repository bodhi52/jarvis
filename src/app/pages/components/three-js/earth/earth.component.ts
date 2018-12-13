import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import THREE from '../three.js';

@Component({
    selector: 'app-earth',
    templateUrl: './earth.component.html',
    styleUrls: ['./earth.component.less']
})
export class EarthComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.RenderElement;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    orbitControls: THREE.OrbitControls;
    
    clock: THREE.Clock;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
       this.init();
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
        this.renderer.render(this.scene, this.camera);
    
        this.camera.position.set(-20, 30, 40);
        this.camera.lookAt(0, 0, 0);
        this.addLight();
        this.createEarth();
        this.addControl();
        this.axes();
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(10);
        this.scene.add(axes);
    }
    
    addControl() {
    
        this.orbitControls = new THREE.OrbitControls(this.camera);
        this.orbitControls.enableDamping = true;
        this.orbitControls.autoRotate = true;
        this.clock = new THREE.Clock();
    }
    
    public addLight() {
        // 均匀照亮场景中的物体，没有方向
        const ambiLight = new THREE.AmbientLight(0x111111);
        this.scene.add(ambiLight);
        // 点光源
        const spotLight = new THREE.DirectionalLight(0xffffff);
        spotLight.position.set(-20, 30, 40);
        spotLight.intensity = 1.5;
        this.scene.add(spotLight);
    }
    
    public createEarth() {
        const planetTexture  = new THREE.TextureLoader().load( '/assets/img/plane/mars_1k_color.jpg' );
        const normalTexture  = new THREE.TextureLoader().load( '/assets/img/plane/mars_1k_normal.jpg' );
        const planetMaterial = new THREE.MeshPhongMaterial({
            map: planetTexture,
            bumpMap: normalTexture,
        });
        const wireFrameMat = new THREE.MeshBasicMaterial({
            wireframe: true,
        });
        const planetGeom = new THREE.SphereGeometry(20, 40, 40);
        const planet = this.createMultiMaterialObject(planetGeom, [planetMaterial]);
        this.scene.add(planet);
    }
    
    createMultiMaterialObject( geometry, materials ) {
        
        const group = new THREE.Group();
        
        for ( let i = 0, l = materials.length; i < l; i ++ ) {
            
            group.add( new THREE.Mesh( geometry, materials[ i ] ) );
            
        }
        return group;
        
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    animate() {
        const delta = this.clock.getDelta();
        this.orbitControls.update(delta);
    }
}
