import {Injectable} from '@angular/core';
import {HeroInterface} from '../interface/hero.interface';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ApiUntilService} from '../api/api-until.service';
import {ApiUrlService} from '../api/api-url.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
};

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    
    private heroesUrl = 'api/heroes';
    
    constructor(
        private messageService: MessageService,
        private http: HttpClient,
        private apiUnit: ApiUntilService,
        private apiUrl: ApiUrlService,
    ) {
    }
    
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
    
    /**
     * 获得英雄列表
     */
    getHeroes() {
        return this.apiUnit.get(this.apiUrl.api.hero.list);
    }
    
    // getHeroes(): Observable<HeroInterface[]> {
    //     return this.http.get<HeroInterface[]>(this.heroesUrl).pipe(
    //         tap(heroes => this.log('fetched heroes')),
    //         catchError(this.handleError('getHeroes', []))
    //     );
    // }
    
    getHero(id: number): Observable<HeroInterface> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<HeroInterface>(url).pipe(
            tap(_ => this.log(`fetched hero id = ${id}`)),
            catchError(this.handleError<HeroInterface>('getHeroes'))
        );
    }
    
    updateHero(hero: HeroInterface): Observable<any> {
        
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => this.log(`updated hero id= ${hero.id}`)),
            catchError(this.handleError<any>('updateHero')),
        );
    }
    
    addHero(hero: HeroInterface): Observable<HeroInterface> {
        return this.http.post<HeroInterface>(this.heroesUrl, hero, httpOptions).pipe(
            tap((newHero: HeroInterface) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<HeroInterface>('addHero')),
        );
    }
    
    deleteHero(hero: HeroInterface | number): Observable<HeroInterface> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete<HeroInterface>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted hero id = ${id}`)),
            catchError(this.handleError<HeroInterface>('deleteHero')),
        );
    }
    
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
