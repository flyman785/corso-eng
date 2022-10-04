import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, first, map, mapTo, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private readonly balance$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  get balance(): Observable<number> {
    return this.balance$.asObservable();
  }

  get balanceValue(): number {
    return this.balance$.getValue();
  }

  deposit(value: number): Observable<string> {
    return this.balance.pipe(
      first(),
      tap(_ => {
        if (value > 0) {
          return;
        }
        throw new Error('Hai inserito un valore errato');
      }),
      map(v => v + value),
      tap(res => this.balance$.next(res)),
      mapTo('Deposito effettuato')
    );
  }

  whitDraw(value: number): Observable<string> {
    return this.balance.pipe(
      first(),
      tap(_ => {
        if (value > 0) {
          return;
        }
        throw new Error('Hai inserito un valore errato');
      }),
      map(v => v - value),
      map(res => {
        if (value > this.balanceValue) {
          throw new Error('non hai abbastanza soldi');
        } else {
          this.balance$.next(res);
          return 'prelievo effettuato';
        }
      }),
      catchError(err => {
        return throwError(err)
      })
    );
  }
}
