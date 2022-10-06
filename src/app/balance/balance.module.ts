import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account/bank-account.component';
import {BalanceRoutingModule} from "./balance-routing.module";
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {bankFeature} from "../reducers/bank/bank";
import {EffectsModule} from "@ngrx/effects";
import {BankEffectsService} from "../shared/effetcs/bank-effects.service";

@NgModule({
  declarations: [
    BankAccountComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    SharedModule,
    StoreModule.forFeature(bankFeature),
    EffectsModule.forFeature([BankEffectsService])
  ]
})
export class BalanceModule { }
