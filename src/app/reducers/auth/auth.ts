import {ActionReducerMap, createAction, createReducer, on, props} from "@ngrx/store";

export interface AppState {
  auth: boolean;
}

export enum ReducerAction {
  LOGIN = '[Login Page] Click on Button Login',
  LOGIN_SUCCESS = '[Login Page] Login executed',
  LOGIN_FAILED = '[Login Page] Login failed',
  LOGOUT = '[Logout Button] Click on Button Logout'
}

export const loginAction = createAction(
  ReducerAction.LOGIN,
  props<{email: string, password: string}>()
);

export const loginSuccess = createAction(
  ReducerAction.LOGIN_SUCCESS
)

export const loginFailed = createAction(
  ReducerAction.LOGIN_FAILED
)

export const logoutAction = createAction(
  ReducerAction.LOGOUT
);

export const selectAuthStatus = (state: AppState) => state.auth;

export const authReducer = createReducer(
  false,
  on(loginSuccess, () => true),
  on(logoutAction, () => false)
);

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
}
