import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {NewsModel} from "./news.service";
import {Store} from "@ngrx/store";
import {addNewsAction, getNews, NewsState} from "../../reducers/news/news";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NewsStoreService {
  private readonly _newsList$ = this.store.select(getNews);

  constructor(
    private store: Store<NewsState>
  ) { }

  get newsList$(): Observable<NewsModel[]> {
    return this._newsList$;
  }

  // get newsList(): NewsModel[] {
    // return this._newsList$.getValue();
  // }

  set updateAllNews(newList: NewsModel[]) {
    this.store.dispatch(addNewsAction({ newsList: newList }));
  }

  set updateNews(value: NewsModel | NewsModel[]) {
    // this.updateAllNews = this.newsList.concat(value);
  }

  set updateElement(data: NewsModel) {
    // this.updateAllNews = [...this.newsList].map((item) => {
    //   if (item.id === data.id) {
    //     return data;
    //   }
    //   return item;
    // });
  }

  set removeElement(id: number) {
    // this.updateAllNews = [...this.newsList].filter(item => item.id !== id);
  }
}
