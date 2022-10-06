import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginAction, loginFailed, loginSuccess, logoutAction} from "../../reducers/auth/auth";
import {filter, map, tap} from "rxjs/operators";
import {NavigationEnd, Router, Event} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginEffectsService {

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) { }

  loginUser$ = createEffect( () =>
    this.actions$
    .pipe(
      ofType(loginAction),
      map(({ email, password }) => {
        if (password?.length >= 4 && !!email) {
          return loginSuccess()
        } else {
          return loginFailed()
        }
      })
    )
  );

  logoutUser$ = createEffect( () =>
    this.actions$
      .pipe(
        ofType(logoutAction),
        tap(_ => {
          this.authService.redirect = '';
          this.router.navigate(['']);
        })
      ),
    ({dispatch: false})
  );

  loginSuccess$ = createEffect( () =>
    this.actions$
      .pipe(
        ofType(loginSuccess),
        tap(_ => {
          !!this.authService.redirect ? this.router.navigate([this.authService.redirect]) : this.router.navigate(['']);
        })
      ),
    ({dispatch: false})
  );

  navigationEvents$ = createEffect( () =>
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        tap(e => console.log('nav', e))
      ),
    ({dispatch: false})
  );
}
