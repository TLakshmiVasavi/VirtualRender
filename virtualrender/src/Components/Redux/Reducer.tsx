import { Reducer } from "redux";
import { Model } from "../Models";
import { EmployeeEvents } from "./Types";
interface IEmpState {
  EmpDetails: Model.EmpData[];
  isLoading: boolean;
  isLoaded: boolean;
}

const intialState: IEmpState = {
  EmpDetails: [],
  isLoaded: false,
  isLoading: false,
};

interface IEmpAction {
  type: string;
  payload?: any;
}

export const empReducer: Reducer<IEmpState> = (
  state = intialState,
  action: IEmpAction
) => {
  switch (action.type) {
    case EmployeeEvents.GET_EMP_DETAILS_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case EmployeeEvents.GET_EMP_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        EmpDetails: action.payload ?? [],
      };
    case EmployeeEvents.GET_EMP_DETAILS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
