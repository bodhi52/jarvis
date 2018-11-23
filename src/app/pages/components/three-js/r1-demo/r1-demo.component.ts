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
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    
    ngAfterViewInit() {
        this.init();
        this.addPlane();
        this.axes();
        this.addText();
        this.addLine();
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
        const planeGeometry = new THREE.PlaneGeometry(220, 110);
        const texture = new THREE.TextureLoader().load('/assets/img/world-50m-countries.png');
        // const bumpMap = THREE.ImageUtils.loadTexture('/assets/img/earth4.jpg');
        
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.rotation.x = -0.5 * Math.PI;
        plane.rotation.x = -0.2 * Math.PI;
        plane.position.set(0, -40, 0);
        console.log(plane);
        this.scene.add(plane);
    }
    
    addText() {
        
        const loader = new THREE.FontLoader();
        
        loader.load('/assets/fonts/helvetiker_bold.typeface.json', (font) => {
            
            const textGeo = new THREE.TextGeometry('R1 Protocol', {
                font: font,
                size: 10,
                height: 0,
                bevelThickness: 1,
                bevelSize: 1,
                bevelSegments: 1,
                curveSegments: 50,
                steps: 1
            });
            
            
            const textMaterial = new THREE.MeshBasicMaterial({
                color: 0xbbbbbb,
                // wireframe: true,
            });
            
            const mesh = new THREE.Mesh(textGeo, textMaterial);
            // mesh.rotation.x = 0.2 * Math.PI;
            console.log('textGeo.parameters.width', textGeo);
            mesh.position.set(-40, 40, 0);
            
            this.scene.add(mesh);
            
        });
    }
    
    addLine() {
        const lineArr = [
            [
                {
                    x: 0,
                    y: -40,
                    z: 0
                },
                {
                    x: 0,
                    y: 40,
                    z: 0
                }
            ],
            [
                {
                    x: -30,
                    y: -40,
                    z: 0
                },
                {
                    x: 0,
                    y: 40,
                    z: 0
                }
            ],
            [
                {
                    x: 80,
                    y: -40,
                    z: 0
                },
                {
                    x: 0,
                    y: 40,
                    z: 0
                },
            ]
        ];
        const curveMaterial = new THREE.LineBasicMaterial({color: 0xFFFF00});
        
        for (const item of lineArr) {
            const p = {
                x: 0,
                y: 0,
                z: 0,
            };
            // p.y = Math.abs(item[0].x);
            const middle = [
                (item[0]['x'] + item[1]['x']) / 2 + p.x,
                (item[0]['y'] + item[1]['y']) / 2 + p.y,
                (item[0]['z'] + item[1]['z']) / 2 + p.z];
            const curve = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(item[0]['x'], item[0]['y'], item[0]['z']),
                // new THREE.Vector3(p.x, p.y, p.z),
                new THREE.Vector3(middle[0], middle[1], middle[2]),
                new THREE.Vector3(item[1]['x'], item[1]['y'], item[1]['z']));
            // const path = new THREE.CurvePath();
            // path.add(curve);
            const points = curve.getPoints( 50 );
    
    
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
    
            const curvedLine = new THREE.Line(geometry, curveMaterial);
            this.scene.add(curvedLine);
    
            // const points = curve.getPoints(50);
            // const geometry = new THREE.BufferGeometry().setFromPoints( points );
            // const splineObject = new THREE.Line( geometry, material );
            // this.scene.add(splineObject);
            
        }
        
        // const pointLight = new THREE.PointLight(0xff0000, 1, 100, 1);
        // pointLight.name = 'pointLight';
        // this.scene.add(pointLight);
    }
    
    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.animate();
    }
    
    private animate() {
    }
    
}
