import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from "rxjs";
import {BankAccountService} from "../../shared/services/bank-account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Destroyer} from "../../shared/utils/destroyer";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankAccountComponent extends Destroyer {
  money$?: Observable<number>;
  form: FormGroup;
  response?: string;

  constructor(
    private bankAccountService: BankAccountService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.money$ = this.bankAccountService.balance;
    this.form = this.formBuilder.group({
      soldi: [null, [Validators.required]]
    })
  }

  dep(): void {
    const value = this.form.get('soldi')?.value;
    this.bankAccountService.deposit(parseInt(value, 10))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          this.form.get('soldi')?.reset();
          this.response = res;
        },
        error: (err) => this.response = err,
        complete: () => {}
      });
  }

  pre(): void {
    const value = this.form.get('soldi')?.value;
    this.bankAccountService.whitDraw(parseInt(value, 10))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          this.form.get('soldi')?.reset();
          this.response = res;
        },
        error: (err) => this.response = err,
        complete: () => {}
      });
  }
}
