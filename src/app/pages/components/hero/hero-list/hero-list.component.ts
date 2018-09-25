import {Component, OnInit} from '@angular/core';
import {HeroInterface} from '../../../../core/interface/hero.interface';
import {HeroService} from '../../../../core/service/hero.service';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.less']
})
export class HeroListComponent implements OnInit {
    
    heroes: HeroInterface[];
    
    selectHero: HeroInterface;
    
    constructor(
        private heroService: HeroService,
    ) {
    }
    
    ngOnInit() {
        this.getHeores();
    }
    
    /**
     * 选中
     * @param hero
     */
    onSelect(hero) {
        this.selectHero = hero;
    }
    
    getHeores(): void {
        this.heroService.getHeroes().subscribe(heroes => {
            this.heroes = heroes;
        });
    }
}
