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

  set updateAllElements(newList: NewsModel[]) {
    this._newsList$.next(newList);
  }

  set updateList(value: NewsModel | NewsModel[]) {
    this.updateAllElements = this.newsList.concat(value);
  }

  set updateElement(data: NewsModel) {
    this.updateAllElements = [...this.newsList].map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
  }

  set removeElement(id: number) {
    this.updateAllElements = [...this.newsList].filter(item => item.id !== id);
  }
}
