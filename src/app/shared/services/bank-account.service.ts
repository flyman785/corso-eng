import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  Bank,
  depositAction,
  selectAmount,
  selectError,
  whitDrawAction
} from "../../reducers/bank/bank";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private readonly balance$ = this.store.select(selectAmount);
  private readonly error$ = this.store.select(selectError);

  constructor(
    private store: Store<Bank>
  ) { }

  get balance(): Observable<number> {
    return this.balance$;
  }

  get error(): Observable<string> {
    return this.error$;
  }

  deposit(value: number): void {
    this.store.dispatch(depositAction({ amount: value }));
  }

  whitDraw(value: number): void {
    this.store.dispatch(whitDrawAction({ amount: value }));
  }
}
