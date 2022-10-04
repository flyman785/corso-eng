import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NewsService } from '../../shared/services/news.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id?: string | null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      title: [],
      description: []
    });

    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        filter(paramMap => !!paramMap.has('id')),
        tap(paramMap => this.id = paramMap.get('id')),
        switchMap(_ => {
          return this.newsService.getSingle(this.id as string);
        }),
        tap(res => {
          this.form.patchValue({
            title: res.title,
            description: res.description
          });
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
  }

  saveModel(): void {
    const {title, description} = this.form.getRawValue();
    const payload = {title, description, id: this.id as string};

    if (!!this.id) {
      this.newsService.updateNews(this.id as string, payload).pipe(
        takeUntil(this.destroy$),
        tap(_ => {
          this.router.navigate(['..'], {
            relativeTo: this.route
          });
        })
      ).subscribe();
    } else {
      this.newsService.addNews(payload)
        .pipe(
          takeUntil(this.destroy$),
          tap(res => {
            this.id = res.id;
            this.router.navigate(['..', res.id], {
              relativeTo: this.route
            });
          })
        ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
}
