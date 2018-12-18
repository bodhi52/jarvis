import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import THREE from '../../three';


@Component({
    selector: 'app-horse',
    templateUrl: './horse.component.html',
    styleUrls: ['./horse.component.less']
})
export class HorseComponent implements OnInit, AfterViewInit {
    
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    renderer: THREE.RenderElement;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.init();
    }
    
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
    
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.shadowMap.enable = true;
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.render(this.scene, this.camera);
    
    
        this.camera.position.set(250, 250, 300);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.axes();
        this.addLight();
        this.addHorse();
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(100);
        this.scene.add(axes);
    }
    
    addLight() {
        const spotLight = new THREE.DirectionalLight(0xffffff);
        spotLight.position.set(300, 200, 300);
        spotLight.intensity = 1;
        this.scene.add(spotLight);
    }
    
    addHorse() {
        const loader = new THREE.JSONLoader();
        loader.load('/assets/models/horse.js', (geometry, material) => {
            material = new THREE.MeshLambertMaterial({
                morphTargets: true,
                vertexColors: THREE.FaceColors
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = -100;
            mesh.geometry.morphTargets.forEach(item => {
               const geom = new THREE.Geometry();
               geom.vertices = item.vertices;
               geom.faces = geometry.faces;
               
               const mat2 = new THREE.MeshLambertMaterial({
                   color: 0xffffff,
                   vertexColors: THREE.FaceColors,
               });
               const morpMesh = new THREE.Mesh(geom, mat2);
               morpMesh.position.x = -100;
            });
            
            geometry.computeVertexNormals();
            geometry.computeFaceNormals();
            geometry.computeMorphNormals();
            
            const meshAnim = new THREE.MorphAnimMesh(geometry, material);
            meshAnim.duration = 1000;
            meshAnim.position.x = 200;
            meshAnim.position.z = 0;
            this.scene.add(meshAnim);
        });
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        // window.requestAnimationFrame(this.render.bind(this));
        // this.animate();
    }
    
    private animate() {
    }
}
