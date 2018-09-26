import {Injectable} from '@angular/core';
import {HeroInterface} from '../interface/hero.interface';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    
    private heroesUrl = 'api/heroes';
    
    constructor(
        private messageService: MessageService,
        private http: HttpClient,
    ) {
    }
    
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
    
    getHeroes(): Observable<HeroInterface[]> {
        this.log('fetched heroes');
        return this.http.get<HeroInterface[]>(this.heroesUrl).pipe(
            tap(heroes => this.log('fetched heroes')),
            catchError(this.handleError('getHeroes', []))
        );
    }
    
    getHero(id: number): Observable<HeroInterface> {
        this.log(`fetched hero id=${id}`);
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<HeroInterface>(url).pipe(
            tap(_ => this.log(`fetched hero id = ${id}`)),
            catchError(this.handleError<HeroInterface>('getHeroes'))
        );
    }
    
    updateHero(hero: HeroInterface): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => this.log(`updated hero id= ${hero.id}`)),
            catchError(this.handleError<any>('updateHero')),
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
