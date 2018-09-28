import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HeroInterface} from '../../../../core/interface/hero.interface';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HeroService} from '../../../../core/service/hero.service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.less']
})
export class HeroSearchComponent implements OnInit {
    
    heroes: HeroInterface[] = [];
    
    private searchTerms = new Subject<string>();
    
    constructor(
        private heroService: HeroService,
    ) {
    }
    
    ngOnInit() {
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroService.searchHero({name: term}))
        ).subscribe(res => {
            if (res['code'] === 0) {
                this.heroes = res['data'];
            }
        });
    }
    
    search(term: string): void {
        if (!term) {
            this.heroes = [];
            return;
        }
        this.searchTerms.next(term);
    }
    
    
    
}
