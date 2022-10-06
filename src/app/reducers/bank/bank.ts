import {createAction, createFeature, createReducer, on, props} from "@ngrx/store";

export interface Bank {
  amount: number;
  error: string;
}

export enum BankAction {
  Deposit = '[Deposit Button] Click on button',
  Deposit_Success = '[Deposit Success] Amount updated',
  Deposit_Error = '[Deposit Error] Amount not updated',
  WhitDraw = '[WhitDraw Button] Click on button',
  WhitDraw_Success = '[WhitDraw Success] Amount updated',
  WhitDraw_Error = '[WhitDraw Error] Amount not updated'
}

export const depositAction = createAction(
  BankAction.Deposit,
  props<{amount: number}>()
)

export const whitDrawAction = createAction(
  BankAction.WhitDraw,
  props<{amount: number}>()
)

export const depositSuccess = createAction(
  BankAction.Deposit_Success,
  props<{amount: number}>()
)

export const depositError = createAction(
  BankAction.Deposit_Error,
  props<{errorDeposit: string}>()
)

export const whitDrawSuccess = createAction(
  BankAction.WhitDraw_Success,
  props<{amount: number}>()
)

export const whitDrawError = createAction(
  BankAction.WhitDraw_Error,
  props<{errorWhitDraw: string}>()
)

export const initialState: Bank = {
  amount: 0,
  error: ''
};

export const bankReducer = createReducer(
  initialState,
  on(depositSuccess, (state, { amount }) =>
    ({ ...state, amount: (state.amount + amount), error: '' })),
  on(whitDrawSuccess, (state, { amount }) =>
    ({ ...state, amount: (state.amount - amount), error: '' })),
  on(depositError, (state, { errorDeposit }) =>
    ({ ...state, error: errorDeposit })),
  on(whitDrawError, (state, { errorWhitDraw }) =>
    ({ ...state, error: errorWhitDraw }))
)

export const bankFeature = createFeature({
  name: "bank",
  reducer: bankReducer
})

export const { selectAmount, selectError } = bankFeature;
