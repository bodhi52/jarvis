import {Component, OnInit} from '@angular/core';
import {HeroInterface} from '../../../../core/interface/hero.interface';
import {HeroService} from '../../../../core/service/hero.service';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.less']
})
export class HeroListComponent implements OnInit {
    
    add = false;
    
    heroes: HeroInterface[];
    
    constructor(
        private heroService: HeroService,
    ) {
    }
    
    ngOnInit() {
        this.getHeores();
    }
    
    getHeores(): void {
        this.heroService.getHeroes().subscribe(res => {
            if (res.code === 0) {
                this.heroes = res.data;
            }
        });
    }
    
    delete(hero: HeroInterface): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
    
    addSuccess($event) {
        console.log('$event', $event);
        this.heroes = [...this.heroes, $event];
        console.log('heroes', this.heroes);
    }
}
