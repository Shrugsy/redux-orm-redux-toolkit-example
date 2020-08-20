import { createAction, createReducer } from "@reduxjs/toolkit";

// ACTIONS
export const setUser = createAction("currentUser/set");
export const clearUser = createAction("currentUser/clear");

// REDUCER
const initialState = null;
export const reducer = createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
  [clearUser]: (state) => initialState
});
