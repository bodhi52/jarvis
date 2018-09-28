import {Component, OnInit} from '@angular/core';
import {HeroInterface} from '../../../../core/interface/hero.interface';
import {HeroService} from '../../../../core/service/hero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

    heroes: HeroInterface[] = [];
    
    constructor(
        private heroService: HeroService,
    ) {
    }
    
    ngOnInit() {
        this.getHeroes();
    }
    
    getHeroes(): void {
        this.heroService.getHeroes().subscribe(res => {
            if (res.code === 0) {
                this.heroes = res.data.slice(0, 4);
            }
        });
    }
    
}
