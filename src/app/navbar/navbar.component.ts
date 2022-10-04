import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isLogged: Observable<boolean>;

  constructor(
    public authService: AuthService
  ) {
    this.isLogged = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
