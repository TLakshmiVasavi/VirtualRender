import { EmployeeEvents } from "./Types";
import { createAction } from "typesafe-actions";
import EmpService from "./Services";
import { Model } from "../Models";
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
  let x: any = null;
  if (!isLoading && !isLoaded) {
    store.dispatch(empActions.GetEmpDetailsAction());
  } else if (isLoaded) {
    x = store.getState().employee.EmpDetails ?? [];
    console.log(store.getState().employee.EmpDetails);
  }
  console.log(x);
  return x ?? [];
}
