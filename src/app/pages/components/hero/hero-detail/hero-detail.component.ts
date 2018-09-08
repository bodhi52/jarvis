import {Component, Input, OnInit} from '@angular/core';
import {HeroInterface} from '../../../../core/interfaces/hero.interface';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {
    
    @Input() hero: HeroInterface;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
