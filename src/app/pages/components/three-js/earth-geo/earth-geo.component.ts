import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import THREE from '../three.js';

interface CityInterface {
    name: string;
    id: string;
    lat: number;   // 经纬度查询请到 http://www.gpsspg.com/maps.htm
    lon: number;
}

@Component({
    selector: 'app-earth-geo',
    templateUrl: './earth-geo.component.html',
    styleUrls: ['./earth-geo.component.less']
})
export class EarthGeoComponent implements OnInit {
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    renderer: THREE.RenderElement;
    
    scene: THREE.Scene;
    
    camera: THREE.PerspectiveCamera;
    
    earth: THREE.Mesh;
    
    orbitControls: THREE.OrbitControls;
    
    clock: THREE.Clock;

    halfHeigh: number;
    halfWidth: number;
    
    citys = [
        {
            name: '北京',
            id: 'beijin',
            lat: 39.9075,   // 经纬度查询请到 http://www.gpsspg.com/maps.htm
            lon: 116.39723
        },
        {
            name: '东京',
            id: 'dongjing',
            lat: 35.6895,
            lon: 139.69171,
        },
        {
            name: 'New York',
            id: 'new-york',
            lat: 40.71427,
            lon: -74.0059
        },
        {
            name: 'Moscow',
            id: 'moscow',
            lat: 55.75222,
            lon: 37.61556
        }
    ];
    
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    constructor(
        private renderer2: Renderer2,
        private el: ElementRef,
    ) {
    }
    
    ngOnInit() {
        this.init();
    }
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.halfHeigh = this.canvas.clientHeight / 2;
        this.halfWidth = this.canvas.clientWidth / 2;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.render(this.scene, this.camera);
        //
        this.camera.position.set(-20, 30, 40);
        this.camera.lookAt(0, 0, 0);
        this.camera.updateMatrixWorld();

        this.addLight();
        this.addControl();
        this.createEarth();
        this.axes();
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(30);
        this.scene.add(axes);
    }
    
    public addLight() {
        // 均匀照亮场景中的物体，没有方向
        const ambiLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambiLight);
        // 点光源
        const spotLight = new THREE.DirectionalLight(0xffffff);
        spotLight.position.set(-20, 30, 40);
        spotLight.intensity = 1.5;
        // this.scene.add(spotLight);
    }
    
    addControl() {
        this.orbitControls = new THREE.OrbitControls(this.camera);
        this.orbitControls.enableDamping = true;
        this.orbitControls.autoRotateSpeed = 1;
        this.orbitControls.autoRotate = true;
        this.clock = new THREE.Clock();
    }
    
    public createEarth() {
        const planetTexture = new THREE.TextureLoader().load('/assets/img/plane/Earth.png');
        const bumpTexture = new THREE.TextureLoader().load('/assets/img/plane/EarthNormal.png');
        const planetGeom = new THREE.SphereGeometry(20, 40, 40, Math.PI / 2);
        
        const planeMaterial = new THREE.MeshPhongMaterial({
            map: planetTexture,
            bumpMap: bumpTexture,
            opacity: 0.8,
            transparent: true
            // color: 0xffffff,
        });
        
        const wireMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
        });
        this.earth = this.createMultiMaterialObject(planetGeom, [
            planeMaterial,
            // wireMaterial
        ]);
        
        this.addPoint();
        this.addDiv();

        this.addLine(this.citys[1], this.citys[2]);
        this.scene.add(this.earth);
    
        this.render();
    }
    
    addDiv() {

        const worldDom = this.el.nativeElement.querySelector('#world');
        for (const city of this.citys) {
            const cityKey = 'citys-' + city.id;
            const cityMesh = this.earth.getObjectByName(cityKey);
            const vector = cityMesh.position.clone().project(this.camera);
            console.log(cityKey, JSON.stringify(vector));
            const dom: ElementRef = this.renderer2.createElement('div');
            this.renderer2.addClass(dom, 'point');
            this.renderer2.setAttribute(dom, 'id', cityKey);

            this.renderer2.setStyle(dom, 'top', Math.round((1 - vector.y) * this.halfHeigh) + 'px');
            this.renderer2.setStyle(dom, 'left', Math.round((1 + vector.x) * this.halfWidth) + 'px');
            dom['innerText'] = city.name;
            this.renderer2.appendChild(worldDom, dom);
        }
        
    
    }
    
    createMultiMaterialObject(geometry, materials) {
        
        const group = new THREE.Group();
        
        for (let i = 0, l = materials.length; i < l; i++) {
            
            group.add(new THREE.Mesh(geometry, materials[i]));
            
        }
        return group;
        
    }
    
    public addPoint() {
        const geometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 3);
        const circleMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF0000,
        });
        
        for (const item of this.citys) {
            const proPeking = this.getPosition(item.lon, item.lat, 20);
            const circle = new THREE.Mesh(geometry, circleMaterial);
            circle.position.set(proPeking.x, proPeking.y, proPeking.z);
            circle.name = 'citys-' + item.id;
            this.earth.add(circle);
        }

        
    }
    
    /**
     * 贴着地皮的线
     * @param city1
     * @param city2
     */
    addLine1(city1: CityInterface, city2: CityInterface) {
        const r = 20;
        const v1 = this.getPosition(
            city1.lon,
            city1.lat,
            r
        ), v2 = this.getPosition(
            city2.lon,
            city2.lat,
            r
        );
        
        const line = {
            v1: v1,
            v2: v2,
            vertices: [v1, v2],
            nums: 5
        };
        
        const curve = new THREE.CatmullRomCurve3(this.interVector3(line).vertices);
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color(0xff0000)
        });
        
        // Create the final object to add to the scene
        const earthLine = new THREE.Line(geometry, material);
        earthLine.name = 'line-1';
        this.earth.add(earthLine);
    }
    
    addLine(city1: CityInterface, city2: CityInterface) {
        const r = 20;
    
        const v1 = this.getPosition(
            city1.lon,
            city1.lat,
            r,
        ), v2 = this.getPosition(
            city2.lon,
            city2.lat,
            r
        );

        const delta = v1.angleTo(v2);
        const dr = (r * delta * delta * 0.3) / Math.PI;
        const p1 = this.getPosition(city1.lon, city1.lat, r + dr);
        const p2 = this.getPosition(city2.lon, city2.lat, r + dr);

        
        const lineVector3 = this.interVector3({
            v1: p1,
            v2: p2,
            nums: 2,
            vertices: [p1, p2]
        });
        //
        const curve = new THREE.CubicBezierCurve3(
            v1,
            lineVector3.vertices[1],
            lineVector3.vertices[3],
            v2
        );
    
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color(0xff0000)
        });
    
        const earthLine = new THREE.Line(geometry, material);
        earthLine.name = 'line-1';
        console.log('earthLine', earthLine);
        this.earth.add(earthLine);
    }
    
    interVector3(l) {
        if (l.v1.angleTo(l.v2) === 0) {
            return l;
        }		// 1
        if (l.v1.angleTo(l.v2) === Math.PI) {
            l.v1.x--;
        }  	// 2
        for (let i = 0; i < l.nums; ++i) {
            const newArr = [];
            let j = 0;
            do {
                const v_t1 = (new THREE.Vector3()).copy(l.vertices[j]),  // 3
                    v_t2 = (new THREE.Vector3()).copy(l.vertices[j + 1]),
                    m = v_t1.length() / v_t2.add(v_t1).length();  	// 4
                const newV = v_t1.add(l.vertices[j + 1]).multiplyScalar(m);
                newV.z += 1;
                newArr.push((new THREE.Vector3()).copy(l.vertices[j]));
                newArr.push((new THREE.Vector3()).copy(newV));
                j++;
            } while (j < l.vertices.length - 1);
            newArr.push((new THREE.Vector3()).copy(l.vertices[j]));
            l.vertices = newArr;
        }
        return l;
    }
    
    public render() {
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
        this.animate();
    }
    
    animate() {
        // this.earth.rotation.x += 0.001;
        // this.earth.rotation.y += 0.001;
        // this.earth.rotation.z += 0.001;
        const delta = this.clock.getDelta();
        this.orbitControls.update(delta);
        this.updateDiv();
    }

    public updateDiv() {
        for (const city of this.citys) {
            const cityKey = 'citys-' + city.id;
            const cityMesh = this.earth.getObjectByName(cityKey);
            const vector = cityMesh.position.clone().project(this.camera);
            const dom: ElementRef = this.el.nativeElement.querySelector('#' + cityKey);

            this.renderer2.setStyle(dom, 'top', Math.round((1 - vector.y) * this.halfHeigh) + 'px');
            this.renderer2.setStyle(dom, 'left', Math.round((1 + vector.x) * this.halfWidth) + 'px');
        }
    }
    
    getPosition(lng, lat, r): THREE.Vector3 {
        const theta = (lng + 180) * (Math.PI / 180),
            phi = (90 - lat) * (Math.PI / 180);
        return (new THREE.Vector3()).setFromSpherical(new THREE.Spherical(r, phi, theta));
    }
}
