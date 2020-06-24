import React from "react";
import logo from "./logo.svg";
import "./App.css";
import OnBoardingDetails from "./Components/OnBoardingDetails";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/Store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <OnBoardingDetails />
      </Provider>
    </div>
  );
}

export default App;
