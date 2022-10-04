import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BankAccountComponent} from "./bank-account/bank-account.component";

const routes: Routes = [
  {
    path: '',
    component: BankAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule { }
