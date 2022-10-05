import {createAction, createReducer, on, props} from "@ngrx/store";

export interface Bank {
  amount: number;
}

export enum BankAction {
  Deposit = '[Deposit Button] Click on button',
  WhitDraw = '[WhitDraw Button] Click on button'
}

export const depositAction = createAction(
  BankAction.Deposit,
  props<Bank>()
)

export const whitDrawAction = createAction(
  BankAction.WhitDraw,
  props<Bank>()
)

export const bankReducer = createReducer(
  0,
  on(depositAction, (state, { amount }) => state + amount),
  on(whitDrawAction, (state, { amount }) => state - amount)
)
