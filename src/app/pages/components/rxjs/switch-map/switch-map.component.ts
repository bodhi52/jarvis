import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, interval, Observable, of} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
    selector: 'app-switch-map',
    templateUrl: './switch-map.component.html',
    styleUrls: ['./switch-map.component.less']
})
export class SwitchMapComponent implements OnInit {
    
    @ViewChild('submitBtn') submitBtn: ElementRef;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }
    
    ngOnInit() {
        this.activatedRoute.paramMap.pipe(
            switchMap((params: ParamMap) => of(params.get('id')))
        ).subscribe(data => {
            console.log(data);
        });
    }
    
    changeUrl() {
        this.router.navigate(['/r/switch-map', {id: Math.floor(Math.random() * 100)}]);
    }
    
}
