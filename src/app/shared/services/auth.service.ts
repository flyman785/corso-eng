import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  redirectUrl?: string;

  constructor(private router: Router) { }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  get isLoggedInValue(): boolean {
    return this.isLoggedIn$.getValue();
  }

  login(): void {
    this.isLoggedIn$.next(true);
    if (!!this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.redirectUrl = '';
    this.router.navigate(['']);
  }
}
