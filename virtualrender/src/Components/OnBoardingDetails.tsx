import React from "react";
import "../App.css";
import { Model } from "./Models";
import { AppState } from "./Redux/rootReducer";
import { connect } from "react-redux";
import { getOnBoardingDetails } from "./Redux/Actions";
import logo from "../Images/Logo.png";
import pic from "../Images/download (3).jpg";

class OnBoardingDetails extends React.Component<IProps, Model.IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showIndex: -1,
      isSearching: false,
      sortBy: "dateCreated",
      sortDirection: "DESC",
      searchCondition: "",
      searchRes: [],
      numVisibleItems: 19,
      start: 0,
      end: 19,
      containerStyle: {
        height: 0,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetSearchBox = this.resetSearchBox.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(i: number) {
    this.setState({ showIndex: i });
  }

  closeModal() {
    this.setState({
      showIndex: -1,
    });
  }
  componentDidMount() {}

  onSort(data: Model.EmpData[], sortKey: string) {
    if (this.state.sortDirection == "DESC") {
      return data.sort((a: any, b: any) => (a[sortKey] < b[sortKey] ? 1 : -1));
    } else {
      return data.sort((a: any, b: any) => (a[sortKey] > b[sortKey] ? 1 : -1));
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.data !== prevProps.data) {
      var containerStyle = {
        height: this.props.data
          ? (this.props.data.length + 1) * this.props.itemheight
          : 0,
      };

      this.setState({ ["containerStyle"]: containerStyle });
    }
  }

  handleChange(e: any) {
    let cond = e.target.value;
    this.setState({ searchCondition: e.target.value });
    if (this.props.data !== []) {
      if (e.target.value !== "") {
        var res = this.props.data.filter(
          (y: any) =>
            y.userName.includes(cond) ||
            y.empId.includes(cond) ||
            y.empId.includes(cond)
        );

        this.setState({ isSearching: true });
        this.setState({ searchRes: res });
        this.setState({ start: 0 });
        this.setState({ end: this.state.numVisibleItems });
        this.setState({
          containerStyle: { height: (res.length + 1) * this.props.itemheight },
        });
      } else {
        this.setState({ isSearching: false });
        this.setState({
          containerStyle: {
            height: (this.props.data.length + 1) * this.props.itemheight,
          },
        });
      }
    }
  }

  resetSearchBox() {
    this.setState({ isSearching: false });
    this.setState({ searchCondition: "" });
    this.setState({
      containerStyle: {
        height: (this.props.data.length + 1) * this.props.itemheight,
      },
    });
  }

  handleScroll = (e: any) => {
    var length = 0;
    if (this.state.isSearching) {
      length = this.state.searchRes.length;
    } else {
      length = this.props.data.length;
    }
    let currentIndx = e.target.scrollTop / this.props.itemheight;

    currentIndx =
      currentIndx - this.state.numVisibleItems >= length
        ? currentIndx - this.state.numVisibleItems
        : currentIndx;
    if (currentIndx !== this.state.start) {
      this.setState({ start: currentIndx });
      this.setState({
        end:
          currentIndx + this.state.numVisibleItems >= length
            ? length - 1
            : currentIndx + this.state.numVisibleItems,
      });
    }
    let element = e.target;
  };

  setSortBy(val: string) {
    if (this.state.sortBy == val) {
      this.setState({
        sortDirection: this.state.sortDirection == "ASC" ? "DESC" : "ASC",
      });
    } else {
      this.setState({ sortBy: val });
      this.setState({ sortDirection: "DESC" });
    }
  }

  render() {
    var displayData: Model.EmpData[] = this.onSort(
      this.state.isSearching
        ? this.state.searchRes
        : this.props.data == null
        ? []
        : this.props.data,
      this.state.sortBy
    );

    var displayData = displayData.slice(
      Math.trunc(this.state.start),
      Math.trunc(this.state.end)
    );

    return (
      <div>
        <div className="header">
          <div className="flex-center">
            <div className="logo" />
          </div>
          <div className="heading">Biz Integrator</div>
          <div className="flex-center">
            <img src={pic} className="pic" />
            <div className="rt-space">UserName</div>
          </div>
        </div>
        <div className="bg-aliceblue">
          <div className="searchBox input-icon">
            <div className="group">
              <input
                placeholder="Search by #, Employee Id,UserName,Location"
                value={this.state.searchCondition}
                type="text"
                className=" input"
                onChange={this.handleChange}
              />
              <span className="icon" onClick={this.resetSearchBox}>
                {this.state.searchCondition !== "" ? "X" : ""}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex-center">
            <table>
              <thead>
                <tr className="fixed">
                  <th
                    className="regType"
                    onClick={() => this.setSortBy("regType")}
                  >
                    Reg Type
                  </th>
                  <th onClick={() => this.setSortBy("empId")}>Employee Id</th>
                  <th onClick={() => this.setSortBy("userName")}>UserName</th>
                  <th onClick={() => this.setSortBy("firstName")}>FirstName</th>
                  <th onClick={() => this.setSortBy("lastName")}>LastName</th>
                  <th onClick={() => this.setSortBy("accType")}>
                    Account Type
                  </th>
                  <th onClick={() => this.setSortBy("startDate")}>
                    Start Date
                  </th>
                  <th onClick={() => this.setSortBy("dateCreated")}>
                    Date Created
                  </th>
                  <th onClick={() => this.setSortBy("location")}>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody
                className="itemContainer"
                style={this.state.containerStyle}
                onScroll={this.handleScroll}
              >
                {displayData.length == 0 ? (
                  <tr className="item" style={{ top: "0px", height: "30px" }}>
                    <td style={{ width: "1385px", height: "30px" }}>
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  displayData.map((item: any, i: any) => (
                    <tr
                      className="item"
                      style={{
                        top: i * this.props.itemheight,
                        height: this.props.itemheight,
                      }}
                    >
                      <td className="regType">{item.regType}</td>
                      <td> {item.empId}</td>
                      <td>{item.userName}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.accType}</td>
                      <td>{item.startDate.split("T")[0]}</td>
                      <td>{item.dateCreated.split("T")[0]}</td>
                      <td>{item.location}</td>
                      <td
                        tabIndex={0}
                        onClick={() => this.openModal(i)}
                        onBlur={this.closeModal}
                        className="cursor"
                      >
                        <i
                          className="ms-Icon ms-Icon--MoreVertical"
                          aria-hidden="true"
                        ></i>
                        {this.state.showIndex == i ? (
                          <div className="modal-container">
                            <div className="hightlight">Edit</div>
                            <div className="hightlight">Process</div>
                            <div className="hightlight">Skip</div>
                            <div className="hightlight">View</div>
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))
                )}
                <tr
                  className="item"
                  style={{
                    top: this.state.containerStyle.height,
                    height: this.props.itemheight,
                    visibility: "hidden",
                  }}
                >
                  <td>hidden</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  data: getOnBoardingDetails(state.employee.isLoading, state.employee.isLoaded),
  itemheight: 30,
  isLoaded: state.employee.isLoaded,
});

type IProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, {})(OnBoardingDetails);
