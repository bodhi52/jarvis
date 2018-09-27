import {Component, Input, OnInit} from '@angular/core';
import {HeroInterface} from '../../../../core/interface/hero.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../../../core/service/hero.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.less'],
})
export class HeroDetailComponent implements OnInit {
    
    hero: HeroInterface;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location,
    ) {
    }
    
    ngOnInit() {
        this.getHero();
    }
    
    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.heroService.getHero(id).subscribe(res => {
            if (res.code === 0) {
                this.hero = res.data;
            }
        });
    }
    
    goBack() {
        this.location.back();
    }
    
    save() {
        // this.heroService.
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
}
