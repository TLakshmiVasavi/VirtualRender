export declare module Model {
  interface EmpData {
    regType: string;
    empId: string;
    userName: string;
    firstName: string;
    lastName: string;
    accType: string;
    startdate: Date;
    dateCreated: Date;
    Location: string;
  }

  interface IProps {
    itemheight: number;
  }

  interface IState {
    searchCondition: string;
    searchRes: EmpData[];
    displayData: EmpData[];
    numVisibleItems: number;
    start: number;
    end: number;
    containerStyle: { height: number };
  }
}
