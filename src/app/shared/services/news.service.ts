import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface NewsModel {
    id: string;
    title: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(
        private httpClient: HttpClient
    ) {}

    searchNews(
        filter?: string
    ): Observable<NewsModel[]> {
        const params: HttpParams | undefined =
        filter === undefined
          ? undefined
          : new HttpParams().set('q', filter);
        return this.httpClient.get<NewsModel[]>(
            environment.fakeServer + '/news',
            { params }
        );
    }

    getSingle(id: string): Observable<NewsModel> {
        return this.httpClient.get<NewsModel>(
            environment.fakeServer + '/news/' + id
        );
    }

    updateNews(id: string, payload: NewsModel): Observable<NewsModel> {
        return this.httpClient.put<NewsModel>(
            environment.fakeServer + '/news/' + id,
            payload
        );
    }

    addNews(payload: NewsModel): Observable<NewsModel> {
        return this.httpClient.post<NewsModel>(
            environment.fakeServer + '/news',
            payload
        );
    }

    deleteNews(id: string): Observable<unknown> {
      return this.httpClient.delete(
        environment.fakeServer + '/news/' + id
      )
    }
}
