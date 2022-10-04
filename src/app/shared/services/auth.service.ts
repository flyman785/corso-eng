import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  redirectUrl?: string;

  constructor(private router: Router) { }

  login(): void {
    this.isLoggedIn$.next(true);
    if (!!this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }
  }
}
