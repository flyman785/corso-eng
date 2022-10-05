import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account/bank-account.component';
import {BalanceRoutingModule} from "./balance-routing.module";
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {bankReducer} from "../reducers/bank/bank";

@NgModule({
  declarations: [
    BankAccountComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    SharedModule,
    StoreModule.forFeature({
      name: "amount", reducer: bankReducer
    })
  ]
})
export class BalanceModule { }
