import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {debounceTime, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {NewsModel, NewsService} from '../../shared/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {
  news$?: Observable<NewsModel[]>;
  form!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder
  ){

    this.form =  this.formBuilder.group({
      search: []
    });

    this.news$ = this.form.get('search')?.valueChanges
      .pipe(
        startWith(undefined),
        debounceTime(300),
        switchMap(value => {
          return this.newsService.searchNews(value);
        })
      );
  }

  removeHandler(event: string): void {
    this.newsService.deleteNews(event)
      .pipe(
        takeUntil(this.destroy$),
        tap(_ => this.news$ = this.newsService.searchNews())
      )
      .subscribe();
  }
}

