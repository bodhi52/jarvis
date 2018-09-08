import { Injectable } from '@angular/core';
import {HeroInterface} from '../core/interfaces/hero.interface';
import {HEROES} from '../const/heroes.const';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
      private messageService: MessageService,
  ) { }
  
  getHeroes(): Observable<HeroInterface[]> {
      this.messageService.add('HeroService: fetched heroes');
      return of(HEROES);
  }
}
