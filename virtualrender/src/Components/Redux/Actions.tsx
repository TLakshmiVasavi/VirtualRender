import { EmployeeEvents } from "./Types";
import { createAction } from "typesafe-actions";
import EmpService from "./Services";
import { Model } from "../Interface";
import { store } from "./Store";
var service = new EmpService();
class EmployeeActions {
  GetEmpDetailsAction = createAction(
    EmployeeEvents.GET_EMP_DETAILS_REQUEST,
    () => service.getDetails()
  )();
}
export default EmployeeActions;
var empActions = new EmployeeActions();
export function getOnBoardingDetails(isLoading: boolean, isLoaded: boolean) {
  console.log("started");
  let x: any = null;
  if (!isLoading && !isLoaded) {
    console.log("getting from api");
    store.dispatch(empActions.GetEmpDetailsAction());
  } else if (isLoaded) {
    x =
      store.getState().employee.EmpDetails == undefined
        ? null
        : store.getState().employee.EmpDetails;
    console.log(store.getState().employee.EmpDetails);
  }
  console.log(x);
  return x;
}
