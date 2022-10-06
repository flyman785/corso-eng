import { Component, OnInit } from '@angular/core';
import {AuthService, LoginPayload} from '../shared/services/auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: [],
      password: []
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const {email, password} = this.form.getRawValue();
    const payload: LoginPayload = {email, password};
    this.authService.login(payload);
  }
}
