import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as THREE from 'three';
import * as d3 from 'd3';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.less']
})
export class TextComponent implements OnInit, AfterViewInit {
    
    
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    
    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }
    
    renderer: THREE.WebGLRenderer;
    
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
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setClearColor(new THREE.Color(0x333333));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        
        this.axes();
        
        // const r1 = this.createLabel('r1协议', 10, 20, 5, 20, '#ffffff');
        // console.log(r1);
        // this.scene.add(r1);
        const text = this.addText({x: 0, y: 0, z: 0}, 'r1', 'R1协议');
        this.scene.add( text );
        this.camera.position.set(-50, 40, 30);
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * 坐标轴
     */
    axes() {
        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);
    }
    
    createLabel(text, x, y, z, size, color) {
        const canvas = d3.select('body').append('canvas');
        const context = canvas.node().getContext('2d');
        context.font = size + 'pt Arial';
        const margin = 10;
        const textWidth = context.measureText(text).width;
        context.strokeStyle = 'black';
        context.strokeWidth = 10;
        context.strokeRect(0, 0, textWidth, size);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = color || 'black';
        context.fillText(text, canvas.node().width / 2, canvas.node().height / 2);
        const texture = new THREE.Texture(canvas.node());
        texture.needsUpdate = true;
        const material = new THREE.MeshBasicMaterial({
            map : texture
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(textWidth, size, 10, 10), material);
        console.log('textwidth', textWidth, size);
        mesh.overdraw = true;
        // mesh.doubleSided = true;
        mesh.position.x = x;
        mesh.position.y = y;
        canvas.remove();
        return mesh;
    }
    
    /**
     * 创建文本，
     * @param position 文本的位置
     * @param name 索引的名字
     * @param text 文本内容
     * @param font 字体设置相关
     */
    addText(
        position: {x: number, y: number, z: number},
        name: string,
        text: string,
        font: {
            color?: string
            size?: number
            family?: string
        } = {
        },
    ) {
        const canvas = d3.select('body').append('canvas');
        const context = canvas.node().getContext('2d');
        const actualFontSize = font.size || 10;
    
        const textHeight = 400;
        context.font = textHeight + 'pt Arial';
        // 2d duty
        const textWidth = context.measureText(text).width;
        canvas.node().width = textWidth;
        canvas.node().height = textHeight;
        context.font = 'normal ' + textHeight + 'px ' + font.family || 'Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = font.color || '#ffffff';
        context.fillText(text, textWidth / 2, textHeight / 2);
        const texture = new THREE.Texture(canvas.node());
        canvas.remove();
        texture.needsUpdate = true;
        const material = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
        const sprite = new THREE.Sprite( material );
    
        const textObject = new THREE.Object3D();
        textObject.textHeight = actualFontSize;
        textObject.textWidth = (textWidth / textHeight) * textObject.textHeight;
        sprite.scale.set(textWidth / textHeight * actualFontSize, actualFontSize, 1);
        
        sprite.position.set(position.x, position.y, position.z);
        sprite.name = name;
        textObject.add(sprite);
        return textObject;
    }
}
