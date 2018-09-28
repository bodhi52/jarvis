import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HeroInterface} from '../../../../core/interface/hero.interface';
import {HeroService} from '../../../../core/service/hero.service';

@Component({
    selector: 'app-add-hero',
    templateUrl: './add-hero.component.html',
    styleUrls: ['./add-hero.component.less']
})
export class AddHeroComponent implements OnInit {
    
    @Output() success = new EventEmitter();
    
    hero = {
        name: '',
    } as HeroInterface;
    
    constructor(
        private heroService: HeroService,
    ) {
    }
    
    ngOnInit() {
    }
    
    add(): void {
        if (!this.hero.name) {
            return;
        }
        this.heroService.addHero(this.hero).subscribe(res => {
            if (res.code === 0) {
                this.hero.name = null;
                // 添加成功后需要通知父组件
                this.success.emit(res.data);
            }
        });
    }
}
