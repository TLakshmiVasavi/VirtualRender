import React from "react";
import "../App.css";
import { Model } from "./Interface";
import { AppState } from "./Redux/rootReducer";
import { connect } from "react-redux";
import { getOnBoardingDetails } from "./Redux/Actions";

class EmpDetails extends React.Component<IProps, Model.IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displayData: this.props.data,
      searchCondition: "",
      searchRes: [],
      numVisibleItems: 19,
      start: 0,
      end: 19,
      containerStyle: {
        height: this.props.data
          ? this.props.data.length * this.props.itemheight + 160
          : 0,
      },
    };

    this.scollPos = this.scollPos.bind(this);
    this.filter = this.filter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetSearchBox = this.resetSearchBox.bind(this);
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.data !== prevProps.data) {
      this.setState({ ["displayData"]: this.props.data });
      var containerStyle = {
        height: this.props.data
          ? this.props.data.length * this.props.itemheight + 160
          : 0,
      };

      this.setState({ ["containerStyle"]: containerStyle });
    }
  }

  scollPos() {
    console.log("scroll pos" + window.scrollY);
    let currentIndx = window.scrollY / this.props.itemheight;
    currentIndx =
      currentIndx - this.state.numVisibleItems >= this.state.displayData.length
        ? currentIndx - this.state.numVisibleItems
        : currentIndx;
    if (currentIndx !== this.state.start) {
      this.setState({ start: currentIndx });
      this.setState({
        end:
          currentIndx + this.state.numVisibleItems >=
          this.state.displayData.length
            ? this.state.displayData.length - 1
            : currentIndx + this.state.numVisibleItems,
      });
    }
  }

  filter() {
    if (this.state.searchCondition !== "") {
      var res = this.props.data.filter((y: any) =>
        y.name.includes(this.state.searchCondition)
      );
      this.setState({ searchRes: res });
      this.setState({ displayData: res });
      this.setState({ start: 0 });
      this.setState({ end: this.state.numVisibleItems });
      this.setState({
        containerStyle: { height: res.length * this.props.itemheight + 160 },
      });
    }
  }

  handleChange(e: any) {
    this.setState({ searchCondition: e.target.value });
  }
  resetSearchBox() {
    this.setState({ searchCondition: "" });
    this.setState({ displayData: this.props.data });
  }
  handleScroll = (e: any) => {
    let currentIndx = e.target.scrollTop / this.props.itemheight;
    currentIndx =
      currentIndx - this.state.numVisibleItems >= this.state.displayData.length
        ? currentIndx - this.state.numVisibleItems
        : currentIndx;
    if (currentIndx !== this.state.start) {
      this.setState({ start: currentIndx });
      this.setState({
        end:
          currentIndx + this.state.numVisibleItems >=
          this.state.displayData.length
            ? this.state.displayData.length - 1
            : currentIndx + this.state.numVisibleItems,
      });
    }
    let element = e.target;
    console.log(
      "scrollHeight :" +
        element.scrollHeight +
        "scrollTop :" +
        element.scrollTop +
        "client Height :" +
        element.clientHeight
    );
  };
  render() {
    var displayData: Model.EmpData[] =
      this.props.data == null
        ? []
        : this.props.data.slice(
            Math.trunc(this.state.start),
            Math.trunc(this.state.end)
          );

    return (
      <div
        onScroll={this.handleScroll}
        style={{ height: "100vh", overflow: "auto" }}
      >
        <div className="header">
          <div>hello</div>
        </div>
        <div className="searchBox input-icon">
          <div className="group">
            <input
              value={this.state.searchCondition}
              type="text"
              className=" input"
              onChange={this.handleChange}
            />
            <span className="icon" onClick={this.resetSearchBox}>
              {this.state.searchCondition !== "" ? "X" : ""}
            </span>
          </div>
          <button onClick={this.filter}>Search</button>
        </div>
        <div ref="viewPort">
          <table
            className="itemContainer viewPort tableFixHead"
            style={this.state.containerStyle}
            onScroll={this.scollPos}
          >
            <tbody>
              <tr className="fixed">
                <th>regType</th>
                <th>empId</th>
                <th>userName</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>accType</th>
                <th>startdate</th>
                <th>dateCreated</th>
                <th>Location</th>
              </tr>

              {displayData.length == 0 ? (
                <tr className="item" style={{ top: "130px", height: "100px" }}>
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
                      top: i * this.props.itemheight + 130,
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
