import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {NewsModel} from "../../../shared/services/news.service";
import {Destroyer} from "../../../shared/utils/destroyer";
import {debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap} from "rxjs/operators";
import {NewsStoreService} from "../../../shared/services/news-store.service";

@Component({
  selector: 'app-presentation-news',
  templateUrl: './presentation-news.component.html',
  styleUrls: ['./presentation-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationNewsComponent extends Destroyer implements OnInit {
  @Input() news?: Observable<NewsModel[]>;
  @Output() remove = new EventEmitter<number>()
  hide = false;

  constructor(
    private newsStoreService: NewsStoreService,
    private cd: ChangeDetectorRef
  ) {
    super();

    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.destroy$),
        startWith(window.innerWidth),
        debounceTime(500),
        map(() => window.innerWidth as number),
        map((innerWidth: number) => innerWidth > 600),
        distinctUntilChanged(),
        tap(res => {
          this.hide = res;
          this.cd.markForCheck();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
  }

  deleteNews(id: number): void {
    this.remove.emit(id);
  }

}
