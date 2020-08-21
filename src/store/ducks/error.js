const { createSlice } = require("@reduxjs/toolkit");

export const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    create_error: (state, { payload }) => payload,
    clear_error: () => ""
  }
});

export default errorSlice;
