import {createAction, createFeature, createReducer, on, props} from "@ngrx/store";
import {NewsModel} from "../../shared/services/news.service";

export interface NewsState {
  newsList: NewsModel[]
}

export enum NewsAction {
  AddNewsToList = '[Add News Form] Add News To List',
  FilterList = '[News Page] Filter List',
  DeleteNews = '[News Page] Click Delete Button',
  UpdateNews = '[Edit News Form] Click Save Button'
}

export const addNewsAction = createAction(
  NewsAction.AddNewsToList,
  props<NewsModel>()
)

export const filterListAction = createAction(
  NewsAction.FilterList,
  props<{filterList: NewsModel[]}>()
)

export const deleteNewsAction = createAction(
  NewsAction.DeleteNews,
  props<{id: number}>()
)

export const updateNewsAction = createAction(
  NewsAction.UpdateNews,
  props<NewsModel>()
)

const initialState: NewsState = {
  newsList: []
}

export const newsReducer = createReducer(
  initialState,
  on(filterListAction, (state, { filterList }) => {
    return {...state, newsList: [...filterList]};
  }),
  on(addNewsAction, (state, news) => {
    return {...state, newsList: [...state.newsList, news] };
  }),
  on(deleteNewsAction, (state, { id }) => {
    return {...state, newsList: [...state.newsList.filter(v => v.id !== id)] };
  }),
  on(updateNewsAction, (state, news) => {
    return {
      ...state,
      newsList: [
        ...state.newsList.map(item => item.id !== news.id ? item : news)
      ]
    };
  })
)

export const newsFeature = createFeature({
  name: 'news',
  reducer: newsReducer
});

export const { selectNewsList } = newsFeature;
