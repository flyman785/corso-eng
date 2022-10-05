import {createAction, createReducer, on} from "@ngrx/store";

export interface AuthState {
  auth: boolean;
}

export enum ReducerAction {
  LOGIN = '[Login Page] Click on Button Login',
  LOGOUT = '[Logout Button] Click on Button Logout'
}

export const loginAction = createAction(
  ReducerAction.LOGIN
);

export const logoutAction = createAction(
  ReducerAction.LOGOUT
);

export const selectAuthStatus = (state: AuthState) => state.auth;

export const authReducer = createReducer(
  false,
  on(loginAction, () => true),
  on(logoutAction, () => false)
);
