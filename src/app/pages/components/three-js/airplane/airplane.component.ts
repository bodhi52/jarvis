import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';

@Component({
    selector: 'app-airplane',
    templateUrl: './airplane.component.html',
    styleUrls: ['./airplane.component.less']
})
export class AirplaneComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.RenderElement;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    hemisphereLight: THREE.HemisphereLight;
    shadowLight: THREE.DirectionalLight;
    
    airplane: THREE.Object3D;
    
    blade: THREE.Mesh;
    
    /**
     * 定义调色板
     */
    Colors = {
        red: 0xf25346,
        white: 0xd8d0d1,
        brown: 0x59332e,
        pink: 0xF5986E,
        brownDark: 0x23190f,
        blue: 0x68c3c0
    };
    
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
        this.renderer.shadowMap.enable = true;
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.render(this.scene, this.camera);
    
    
        this.camera.position.set(-50, 40, 30);
        this.camera.lookAt(0, 0, 0);
        this.axes();
        this.createLights();
        this.addPlane();
        this.createAirPlane();
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);
    }
    
    createLights() {
        // 半球光，天空的颜色，地上的颜色，光强
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        
        // 方向光，类似太阳，关系颜色，光强
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        
        this.shadowLight.position.set(-40, 60, -10);
        this.shadowLight.castShadow = true;
        
        // // 定义可见区域的投影
        // this.shadowLight.shadow.camera.left = -400;
        // this.shadowLight.shadow.camera.right = 400;
        // this.shadowLight.shadow.camera.top = 400;
        // this.shadowLight.shadow.camera.bottom = -400;
        // this.shadowLight.shadow.camera.near = 1;
        // this.shadowLight.shadow.camera.far = 1000;
        //
        // // 定义阴影的分辨率
        // this.shadowLight.shadow.mapSize.width = 2048;
        // this.shadowLight.shadow.mapSize.height = 2048;
        
        this.scene.add(this.hemisphereLight);
        this.scene.add(this.shadowLight);
    }
    
    createAirPlane() {
        this.airplane = new THREE.Object3D();
        
        // 机舱
        const geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
        const matCockpit = new THREE.MeshPhongMaterial({
            color: this.Colors.red,
            flatShading: THREE.FlatShading,
        });
        const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.airplane.add(cockpit);
        
        // 引擎
        const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
        const matEngine = new THREE.MeshPhongMaterial({
            color: this.Colors.white,
            flatShading: THREE.FlatShading,
        });
        const engine = new THREE.Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.airplane.add(engine);
        
        // 机尾
        const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1);
        const matTailPlane = new THREE.MeshPhongMaterial({
            color: this.Colors.red,
            flatShading: THREE.FlatShading,
        });
        const tailPhone = new THREE.Mesh(geomTailPlane, matTailPlane);
        tailPhone.position.set(-35, 25, 0);
        tailPhone.castShadow = true;
        tailPhone.receiveShadow = true;
        this.airplane.add(tailPhone);
        
        // 机翼
        const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
        const matSideWing = new THREE.MeshPhongMaterial({
            color: this.Colors.red,
            flatShading: THREE.FlatShading,
        });
        const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
        this.airplane.add(sideWing);
        
        
        
        // 螺旋桨
        const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
        const matBlade = new THREE.MeshPhongMaterial({
            color: this.Colors.brownDark,
            flatShading: THREE.FlatShading,
        });
        
        this.blade = new THREE.Mesh(geomBlade, matBlade);
        this.blade.position.set(58, 0, 0);
        this.blade.castShadow = true;
        this.blade.receiveShadow = true;
        this.airplane.add(this.blade);
        
        // 螺旋桨支架
        const geomZhi = new THREE.CylinderGeometry(10, 10, 8);
        const zhi = new THREE.Mesh(geomZhi, matBlade);
        zhi.castShadow = true;
        zhi.receiveShadow = true;
        zhi.position.set(50, 0, 0);
        this.airplane.add(zhi);
        
        this.airplane.castShadow = true;
        this.airplane.position.set(0, 0, 0);
        this.airplane.scale.set(.25, .25, .25);
        this.airplane.name = 'air-plane';
        console.log('plane', this.airplane);
        this.scene.add(this.airplane);
    }
    
    /**
     * 停机坪
     */
    public addPlane() {
        const geom = new THREE.CylinderGeometry(50, 50, 3, 10, 10);
        // geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        const material = new THREE.MeshPhongMaterial({
            color: this.Colors.blue,
            transparent: true,
            opacity: .6,
            flatShading: true,
        });
        const plane = new THREE.Mesh(geom, material);
        plane.receiveShadow = true;
    
        plane.position.set(0, -20, 0);
        this.scene.add(plane);
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    
    private animate() {
        this.airplane.rotation.x += 0.01;
        this.airplane.rotation.y += 0.01;
        // this.airplane.rotation.z += 0.01;
    }
}
