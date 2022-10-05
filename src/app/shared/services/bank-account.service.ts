import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, first, map, mapTo, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Bank, depositAction, whitDrawAction} from "../../reducers/bank/bank";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private readonly balance$ = this.store.select('amount');

  constructor(
    private store: Store<Bank>
  ) { }

  get balance(): Observable<number> {
    return this.balance$;
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
      tap(res => this.store.dispatch(depositAction({amount: value}))),
      mapTo('Deposito effettuato'),
      catchError(err => {
        return throwError(err)
      })
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
      map(_ => {
        // if (value > res) {
        //   throw new Error('non hai abbastanza soldi');
        // } else {
          this.store.dispatch(whitDrawAction({amount: value}))
          return 'prelievo effettuato';
        // }
      }),
      catchError(err => {
        return throwError(err)
      })
    );
  }
}
