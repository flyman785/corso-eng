import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {NewsModel, NewsService} from '../../shared/services/news.service';
import {Destroyer} from "../../shared/utils/destroyer";
import {NewsStoreService} from "../../shared/services/news-store.service";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent extends Destroyer {
  news$?: Observable<NewsModel[]>;
  form!: FormGroup;

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private newsStoreService: NewsStoreService
  ){
    super();

    this.form =  this.formBuilder.group({
      search: []
    });

    this.form.get('search')?.valueChanges
      .pipe(
        startWith(undefined),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          return this.newsService.searchNews(value);
        }),
        tap(res => this.newsStoreService.updateAllNews = res)
      )
      .subscribe();

    this.news$ = this.newsStoreService.newsList$;

  }

  removeHandler(event: number): void {
    this.newsService.deleteNews(event)
      .pipe(
        takeUntil(this.destroy$),
        tap(_ => this.newsStoreService.removeElement = event)
      )
      .subscribe();
  }

}

