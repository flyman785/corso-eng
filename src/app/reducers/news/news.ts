import {createAction, createReducer, on, props} from "@ngrx/store";
import {NewsModel} from "../../shared/services/news.service";

export interface NewsState {
  newsList: NewsModel[]
}

export enum NewsAction {
  AddNews = '[News Page] View List'
}

export const getNews = (state: NewsState) => {
  console.log('get', state);
  return state.newsList;
};

export const addNewsAction = createAction(
  NewsAction.AddNews,
  props<NewsState>()
)

export const newsReducer = createReducer(
  [],
// @ts-ignore
  on(addNewsAction, (state, { newsList }) => {
    return [...state, ...newsList];
  })
)
