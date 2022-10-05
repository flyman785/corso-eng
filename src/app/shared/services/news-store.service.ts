import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NewsModel} from "./news.service";

@Injectable({
  providedIn: 'root'
})
export class NewsStoreService {
  private readonly _newsList$: BehaviorSubject<NewsModel[]> = new BehaviorSubject<NewsModel[]>([]);

  constructor() { }

  get newsList$(): Observable<NewsModel[]> {
    return this._newsList$.asObservable();
  }

  get newsList(): NewsModel[] {
    return this._newsList$.getValue();
  }

  set updateAllNews(newList: NewsModel[]) {
    this._newsList$.next(newList);
  }

  set updateNews(value: NewsModel | NewsModel[]) {
    this.updateAllNews = this.newsList.concat(value);
  }

  set updateElement(data: NewsModel) {
    this.updateAllNews = [...this.newsList].map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
  }

  set removeElement(id: number) {
    this.updateAllNews = [...this.newsList].filter(item => item.id !== id);
  }
}
