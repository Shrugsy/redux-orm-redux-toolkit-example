import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: 1,
  reducers: {
    set: (state, { payload }) => payload,
    clear: () => null
  }
});

export const setCurrentUser = currentUserSlice.actions.set;
export const clearCurrentUser = currentUserSlice.actions.clear;
export const currentUserReducer = currentUserSlice.reducer;
export default currentUserSlice;

// =====alternative method without slice=====
// // ACTIONS
// export const setUser = createAction("currentUser/set");
// export const clearUser = createAction("currentUser/clear");

// // REDUCER
// const initialState = null;
// export const reducer = createReducer(initialState, {
//   [setUser]: (state, action) => action.payload,
//   [clearUser]: (state) => initialState
// });
