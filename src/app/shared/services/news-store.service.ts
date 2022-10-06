import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {NewsModel} from "./news.service";
import {Store} from "@ngrx/store";
import {
  addNewsAction,
  deleteNewsAction,
  filterListAction,
  NewsState,
  selectNewsList, updateNewsAction
} from "../../reducers/news/news";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NewsStoreService {
  private readonly _newsList$ = this.store.select(selectNewsList);

  constructor(
    private store: Store<NewsState>
  ) { }

  get newsList$(): Observable<NewsModel[]> {
    return this._newsList$.pipe(tap(console.log));
  }

  set filterNews(filterList: NewsModel[]) {
    this.store.dispatch(filterListAction({ filterList: filterList }));
  }

  set updateNews(data: NewsModel) {
    this.store.dispatch(updateNewsAction(data));
  }

  set addNews(data: NewsModel) {
    this.store.dispatch(addNewsAction(data));
  }

  set removeElement(id: number) {
    this.store.dispatch(deleteNewsAction({ id }));
  }
}
