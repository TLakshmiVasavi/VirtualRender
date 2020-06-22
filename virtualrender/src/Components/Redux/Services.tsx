import react from "react";
import { store } from "./Store";
import { Model } from "../Interface";
import ResponseActions from "./ResponseActions";
var responseActions = new ResponseActions();
class EmpService {
  getDetails() {
    console.log("requested");
    fetch("https://localhost:44316/Employee")
      .then((response) => response.json())
      .then((data) =>
        store.dispatch(responseActions.GetEmpDetailsSuccessAction(data))
      )
      .catch((error) => console.error(error));

    console.log("responded");
  }
}
export default EmpService;
