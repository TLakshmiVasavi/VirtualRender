import React from "react";
import "../App.css";
import { Model } from "./Interface";
import { AppState } from "./Redux/rootReducer";
import { connect } from "react-redux";
import { getOnBoardingDetails } from "./Redux/Actions";
import PopUpModal from "./PopUpModal";

class EmpDetails extends React.Component<IProps, Model.IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modal: false,
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
    this.openPopUpModal = this.openPopUpModal.bind(this);
    this.closePopUpModal = this.closePopUpModal.bind(this);
  }

  openPopUpModal() {
    this.setState({ modal: true });
  }

  closePopUpModal() {
    this.setState({
      modal: false,
    });
  }

  onSort(data: Model.EmpData[], sortKey: string) {
    if (this.state.sortDirection == "DESC") {
      return data.sort((a: any, b: any) => (a[sortKey] > b[sortKey] ? 1 : -1));
    } else {
      return data.sort((a: any, b: any) => (a[sortKey] < b[sortKey] ? 1 : -1));
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
    if (this.props.data == []) {
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
        console.log(this.props.data.length);
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
    console.log(currentIndx);
    console.log(length);
    console.log(
      currentIndx + this.state.numVisibleItems >= length
        ? length - 1
        : currentIndx + this.state.numVisibleItems
    );
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
          <div>hello</div>
        </div>
        <div className="searchBox input-icon">
          <div className="group">
            <input
              placeholder="Search..."
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
        <div ref="viewPort" className="viewPort" onScroll={this.handleScroll}>
          <div className="itemContainer" style={this.state.containerStyle}>
            <table>
              <tbody>
                <tr className="fixed">
                  <th onClick={() => this.setSortBy("regType")}>Reg Type</th>
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
                <tr
                  className="item"
                  style={{
                    top: 30,
                    height: this.props.itemheight,
                  }}
                >
                  <td>"item.regType"</td>
                  <td> "item.empId"</td>
                  <td>"item.userName"</td>
                  <td>item.firstName"</td>
                  <td>item.lastName"</td>
                  <td>item.accType"</td>
                  <td>item.startDate</td>
                  <td>item.dateCreated</td>
                  <td>item.location</td>
                  <td
                    tabIndex={0}
                    onClick={this.openPopUpModal}
                    onBlur={this.closePopUpModal}
                    className="cursor"
                  >
                    :
                    {this.state.modal ? (
                      <div
                        // tabIndex={0}
                        id="pop"
                      >
                        <div className="modal-container">
                          <div>first</div>
                          <div>second</div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                {displayData.length == 0 ? (
                  <tr className="item" style={{ top: "0px", height: "100px" }}>
                    <td style={{ width: "1385px", height: "100px" }}>
                      {" "}
                      Data Not Found
                    </td>
                  </tr>
                ) : (
                  displayData.map((item: any, i: any) => (
                    <tr
                      className="item"
                      style={{
                        top: i * this.props.itemheight + 30,
                        height: this.props.itemheight,
                      }}
                    >
                      <td>{item.regType}</td>
                      <td> {item.empId}</td>
                      <td>{item.userName}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.accType}</td>
                      <td>{item.startDate.split("T")[0]}</td>
                      <td>{item.dateCreated.split("T")[0]}</td>
                      <td>{item.location}</td>
                      <td onClick={this.openPopUpModal}>:</td>
                    </tr>
                  ))
                )}
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
export default connect(mapStateToProps, {})(EmpDetails);
