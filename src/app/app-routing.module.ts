import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { LoginComponent } from './login/login.component';
import { DenyGuestsGuard } from './shared/guard/deny-guests.guard';
import { OnlyUsersGuard } from './shared/guard/only-users.guard';

const routes: Routes = [
  {
    path: 'news-list',
    canActivate: [OnlyUsersGuard],
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'bank-account',
    canActivate: [OnlyUsersGuard],
    loadChildren: () => import('./balance/balance.module').then(m => m.BalanceModule)
  },
  {
    path: 'category-list',
    component: CategoryListComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DenyGuestsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
