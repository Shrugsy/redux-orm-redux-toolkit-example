import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import PostContainer from "./components/Posts/PostContainer";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  return (
    <div data-testid="App" className="App">
      <Provider store={store}>
        <PostContainer />
        <ErrorMessage />
      </Provider>
    </div>
  );
};

export default App;
