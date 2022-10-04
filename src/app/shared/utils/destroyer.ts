import {Subject} from "rxjs";
import {Component, OnDestroy} from "@angular/core";

@Component({
  selector: 'app-destroyer',
  template: ``
})
export class Destroyer implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
