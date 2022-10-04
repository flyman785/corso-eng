import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, filter, first, map, mapTo, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private balance$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  get balance(): Observable<number> {
    return this.balance$.asObservable();
  }

  get balanceValue(): number {
    return this.balance$.getValue();
  }

  deposit(value: string): Observable<string> {
    return this.balance.pipe(
      first(),
      filter(_ => !!value),
      map(v => v + parseInt(value, 10)),
      tap(res => this.balance$.next(res)),
      mapTo('Deposito effettuato')
    );
  }

  whitDraw(value: string): Observable<string> {
    return this.balance.pipe(
      first(),
      filter(_ => !!value),
      map(v => v - parseInt(value, 10)),
      map(res => {
        if (parseInt(value, 10) > this.balanceValue) {
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
