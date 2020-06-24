import { EmployeeEvents } from "./Types";
import { createAction } from "typesafe-actions";
import { Model } from "../Models";
import { store } from "./Store";
class EmployeeActions {
  GetEmpDetailsSuccessAction = createAction(
    EmployeeEvents.GET_EMP_DETAILS_SUCCESS
  )<Model.EmpData[]>();
  GetEmpDetailsFailureAction = createAction(
    EmployeeEvents.GET_EMP_DETAILS_FAILURE
  )<string>();
}
export default EmployeeActions;
