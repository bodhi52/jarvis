import {Component, OnInit} from '@angular/core';
import {HEROES} from '../../../../const/heroes.const';
import {HeroInterface} from '../../../../core/interfaces/hero.interface';
import {HeroService} from '../../../../service/hero.service';

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
