import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState, loginAction, logoutAction, selectAuthStatus} from "../../reducers/auth/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn$ = this.store.select(selectAuthStatus);
  private redirectUrl = '';

  constructor(
    private readonly store: Store<AppState>
  ) { }

  get redirect(): string {
    return this.redirectUrl;
  }

  set redirect(url: string) {
    this.redirectUrl = url;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  login(payload: LoginPayload): void {
    this.store.dispatch(loginAction(payload));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
