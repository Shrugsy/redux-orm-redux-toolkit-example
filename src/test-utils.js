// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { reducer as ormReducer } from "./store/orm";
import { currentUserSlice } from "./store/slice/currentUser";

export const createDefaultStore = (initialState) =>
  configureStore({
    reducer: {
      orm: ormReducer,
      currentUser: currentUserSlice.Reducer
    },
    preloadedState: initialState
  });

function render(
  ui,
  {
    initialState = {},
    store = createDefaultStore(initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
