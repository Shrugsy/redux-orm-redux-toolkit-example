import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Container from "./components/Posts/Container";

const App = () => {
  return (
    <div data-testid="App" className="App">
      <div className="intro">
        <p>Hello from the App component</p>
        <p>This is a demo project exploring redux-orm testing capabilities</p>
        <p>Key packages used: @testing-library/react, redux-orm</p>
        <p>Testing performed using Jest</p>
      </div>
      <Provider store={store}>
        <Container />
      </Provider>
    </div>
  );
};

export default App;
