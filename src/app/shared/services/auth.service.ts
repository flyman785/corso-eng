import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {AuthState, loginAction, logoutAction, selectAuthStatus} from "../../reducers/auth/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn$ = this.store.select(selectAuthStatus);
  redirectUrl?: string;

  constructor(
    private router: Router,
    private readonly store: Store<AuthState>
  ) { }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  login(): void {
    this.store.dispatch(loginAction())
    if (!!this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }
  }

  logout(): void {
    this.store.dispatch(logoutAction())
    this.redirectUrl = '';
    this.router.navigate(['']);
  }
}
