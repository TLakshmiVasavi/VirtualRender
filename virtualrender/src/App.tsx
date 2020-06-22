import React from "react";
import logo from "./logo.svg";
import "./App.css";
import EmpDetails from "./Components/EmpDetails";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/Store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <EmpDetails />
      </Provider>
    </div>
  );
}

export default App;
