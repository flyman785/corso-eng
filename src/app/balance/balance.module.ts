import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account/bank-account.component';
import {BalanceRoutingModule} from "./balance-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    BankAccountComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    SharedModule
  ]
})
export class BalanceModule { }
