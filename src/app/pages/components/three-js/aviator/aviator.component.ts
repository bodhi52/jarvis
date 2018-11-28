import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';

@Component({
    selector: 'app-aviator',
    templateUrl: './aviator.component.html',
    styleUrls: ['./aviator.component.less']
})
export class AviatorComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.RenderElement;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    hemisphereLight: THREE.HemisphereLight;
    shadowLight: THREE.DirectionalLight;
    
    blade: THREE.Mesh;
    
    sea: THREE.Object3D;
    
    sky: THREE.Object3D;
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
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    
        /**
         * Perspective 透视相机
         * 视角
         * 纵横比
         * 近平面
         * 远平面
         */
        this.camera = new THREE.PerspectiveCamera(
            60,
            this.canvas.clientWidth / this.canvas.clientHeight,
            1,
            10000
        );
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        // 打开渲染器的阴影
        this.renderer.shadowMap.enable = true;
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        
        
        this.camera.position.set(0, 100, 200);
        this.axes();
        this.createLights();
        // this.addCube();
        this.createSea();
        // const cloud = this.createCloud();
        // this.scene.add(cloud);
        this.createSky();
        this.createAirPlane();
        this.renderer.render(this.scene, this.camera);
        this.render();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(100);
        this.scene.add(axes);
    }
    
    createLights() {
        // 半球光，天空的颜色，地上的颜色，光强
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        
        // 方向光，类似太阳，关系颜色，光强
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        
        this.shadowLight.position.set(150, 350, 350);
        this.shadowLight.castShadow = true;
        
        // 定义可见区域的投影
        this.shadowLight.shadow.camera.left = -400;
        this.shadowLight.shadow.camera.right = 400;
        this.shadowLight.shadow.camera.top = 400;
        this.shadowLight.shadow.camera.bottom = -400;
        this.shadowLight.shadow.camera.near = 1;
        this.shadowLight.shadow.camera.far = 1000;
        
        // 定义阴影的分辨率
        this.shadowLight.shadow.mapSize.width = 2048;
        this.shadowLight.shadow.mapSize.height = 2048;
        
        this.scene.add(this.hemisphereLight);
        this.scene.add(this.shadowLight);
    }
    
    createSea() {
        const geom = new THREE.CylinderGeometry(250, 250, 300, 40, 10);
        // const geom = new THREE.CylinderGeometry(150, 180, 300, 40, 10);
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        const material = new THREE.MeshPhongMaterial({
            color: this.Colors.blue,
            transparent: true,
            opacity: .6,
            flatShading: THREE.FlatShading,
        });
        this.sea = new THREE.Mesh(geom, material);
        this.sea.receiveShadow = true;
        // mesh.rotation.x = -0.5 * Math.PI;
    
        this.sea.position.y = -200;
        this.sea.name = 'sea';
        // mesh.position.set(0, -100, 0);
        this.scene.add(this.sea);
    }
    
    createCloud(): THREE.Object3D {
        const cloud = new THREE.Object3D();
        const geom = new THREE.BoxBufferGeometry(15, 15, 15);
        const mat = new THREE.MeshPhongMaterial({
            color: this.Colors.white,
        });
        const nBlocs = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < nBlocs; i ++) {
            const m = new THREE.Mesh(geom, mat);
            m.position.x = i * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;
            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;
            
            const s = .1 + Math.random() * 0.9;
            m.scale.set(s, s, s);
            // 允许正方体生成投影和接收投影
            m.castShadow = true;
            m.receiveShadow = true;
            cloud.add(m);
        }
        
        return cloud;
    }
    
    createSky () {
        this.sky = new THREE.Object3D();
        const nClouds = 20;
        
        const stepAngle = Math.PI * 2 / nClouds;
        
        for (let i = 0; i < nClouds; i ++) {
            const c = this.createCloud();
            const a = stepAngle * i;
            const h = 400 + Math.random() * 200;
            c.position.y = Number(Math.sin(a).toFixed(6)) * h;
            c.position.x = Number(Math.cos(a).toFixed(6)) * h;
            
            c.rotation.z = a + Math.PI / 2;
            
            c.position.z = -200 - Math.random() * 200;
            
            const s = 1 + Math.random();
            c.scale.set(s, s, s);
            this.sky.add(c);
        }
        this.sky.position.y = -200;
        this.sky.name = 'sky';
        this.scene.add(this.sky);
        
    }
    
    createAirPlane() {
        const mesh = new THREE.Object3D();
        
        // 机舱
        const geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
        const matCockpit = new THREE.MeshPhongMaterial({
            color: this.Colors.red,
            flatShading: THREE.FlatShading,
        });
        const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        mesh.add(cockpit);
        
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
        mesh.add(engine);
        
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
        mesh.add(tailPhone);
        
        // 机翼
        const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
        const matSideWing = new THREE.MeshPhongMaterial({
            color: this.Colors.red,
            flatShading: THREE.FlatShading,
        });
        const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
        mesh.add(sideWing);
        
        
        
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
        mesh.add(this.blade);
        
        // 螺旋桨支架
        const geomZhi = new THREE.CylinderGeometry(10, 10, 8);
        const zhi = new THREE.Mesh(geomZhi, matBlade);
        zhi.castShadow = true;
        zhi.receiveShadow = true;
        zhi.position.set(50, 0, 0);
        mesh.add(zhi);
        
        mesh.castShadow = true;
        mesh.position.set(0, 100, 0);
        mesh.scale.set(.25, .25, .25);
        mesh.name = 'air-plane';
        console.log('plane', mesh);
        this.scene.add(mesh);
    }
    
    public render() {
        
        this.renderer.render(this.scene, this.camera);
        
        window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    
    private animate() {
        this.blade.rotation.x += 0.3;
        // this.sky.rotation.z += 0.001;
        // this.sea.rotation.z += 0.01;
    }
    
    
}
