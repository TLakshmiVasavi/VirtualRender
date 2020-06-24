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
    location: string;
  }

  interface IProps {
    itemheight: number;
  }

  interface IState {
    [key: string]: any;
    isSearching: boolean;
    sortBy: string;
    sortDirection: string;
    searchCondition: string;
    searchRes: EmpData[];
    numVisibleItems: number;
    start: number;
    end: number;
    containerStyle: { height: number };
    showIndex: number;
  }
}
