import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  depositAction,
  depositError,
  depositSuccess,
  whitDrawAction,
  whitDrawError,
  whitDrawSuccess
} from "../../reducers/bank/bank";
import {first, map, mergeMap} from "rxjs/operators";
import {BankAccountService} from "../services/bank-account.service";

@Injectable({
  providedIn: 'root'
})
export class BankEffectsService {

  constructor(
    private actions$: Actions,
    private bankAccountService: BankAccountService
  ) { }

  amountDeposit$ = createEffect( () =>
    this.actions$
      .pipe(
        ofType(depositAction),
        map(({ amount }) => {
          if (amount > 0) {
            return depositSuccess({ amount })
          } else {
            return depositError({ errorDeposit: 'Hai inserito un valore negativo' });
          }
        })
      )
  );

  amountWhitDraw$ = createEffect( () =>
    this.actions$
      .pipe(
        ofType(whitDrawAction),
        mergeMap(({ amount }) => this.bankAccountService.balance
          .pipe(
            first(),
            map((v: number) => ({ amount, actualAmount: v }))
          )
        ),
        map(({ amount, actualAmount }) => {
          if (amount > 0) {
            if (amount > actualAmount) {
              return whitDrawError({ errorWhitDraw: 'Non hai abbastanza soldi' });
            } else {
              return whitDrawSuccess({ amount })
            }
          } else {
            return whitDrawError({ errorWhitDraw: 'Hai inserito un valore errato' });
          }
        })
      )
  );
}
