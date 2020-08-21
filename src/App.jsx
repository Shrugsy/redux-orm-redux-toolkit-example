import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import PostContainer from "./components/Posts/PostContainer";
import ErrorMessage from "./components/ErrorMessage";
import ThemeWrapper from "./components/ThemeWrapper";
import Typography from "@material-ui/core/Typography";

const App = () => {
  return (
    <div data-testid="App" className="App">
      <Provider store={store}>
        <ThemeWrapper>
          <Typography variant="h4" gutterBottom>Todos</Typography>
          <PostContainer />
          <ErrorMessage />
        </ThemeWrapper>
      </Provider>
    </div>
  );
};

export default App;
