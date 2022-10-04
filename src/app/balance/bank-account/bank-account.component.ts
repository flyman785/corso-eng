import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BankAccountService} from "../../shared/services/bank-account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankAccountComponent implements OnInit {
  money$?: Observable<number>;
  form: FormGroup;
  response?: string;

  constructor(
    private bankAccountService: BankAccountService,
    private formBuilder: FormBuilder
  ) {
    this.money$ = this.bankAccountService.balance;
    this.form = this.formBuilder.group({
      soldi: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  dep(): void {
    const value = this.form.get('soldi')?.value;
    this.bankAccountService.deposit(value).subscribe({
      next: (res) => {
        this.form.get('soldi')?.reset();
        this.response = res;
      },
      error: () => {},
      complete: () => {}
    });
  }

  pre(): void {
    const value = this.form.get('soldi')?.value;
    this.bankAccountService.whitDraw(value).subscribe({
      next: (res) => {
        this.form.get('soldi')?.reset();
        this.response = res;
      },
      error: (err) => this.response = err,
      complete: () => {}
    });
  }
}
