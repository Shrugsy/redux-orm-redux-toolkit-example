const { createSlice } = require("@reduxjs/toolkit");

export const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    set: (state, { payload }) => payload,
    clear: () => ""
  }
});

export const setError = errorSlice.actions.set;
export const clearError = errorSlice.actions.clear;
export const errorReducer = errorSlice.reducer;

export default errorSlice;
