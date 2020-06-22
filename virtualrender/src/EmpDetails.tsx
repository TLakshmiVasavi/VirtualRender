import React from "react";
import "./App.css";

const data: any = [];

function createData() {
  for (let i = 0; i < 30; i++) {
    data.push({ name: "Row" + i });
  }
}

createData();

interface ContentType {
  name: string;
}

interface IProps {
  itemheight: number;
}

interface IState {
  searchCondition: string;
  searchRes: ContentType[];
  displayData: ContentType[];
  numVisibleItems: number;
  start: number;
  end: number;
  containerStyle: { height: number };
}

class EmpDetails extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displayData: data,
      searchCondition: "",
      searchRes: [],
      numVisibleItems: 19,
      start: 0,
      end: 19,
      containerStyle: { height: data.length * this.props.itemheight + 160 },
    };

    this.scollPos = this.scollPos.bind(this);
    this.filter = this.filter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetSearchBox = this.resetSearchBox.bind(this);
  }

  // componentDidMount() {
  //   window.addEventListener("scroll", this.scollPos);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.scollPos);
  // }

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

  renderRows() {
    let result = [];
    for (
      let i = Math.trunc(this.state.start);
      i <= Math.trunc(this.state.end);
      i++
    ) {
      if (this.state.displayData[i] !== undefined) {
        result.push(
          <tr
            className="item"
            style={{
              top: i * this.props.itemheight + 130,
              height: this.props.itemheight,
            }}
          >
            <td> {this.state.displayData[i].name}</td>

            <td>{i * this.props.itemheight}</td>

            <td>{this.props.itemheight}</td>
          </tr>
        );
      }
    }
    return result;
  }

  filter() {
    if (this.state.searchCondition !== "") {
      var res = data.filter((y: any) =>
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
    this.setState({ displayData: data });
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
    // if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    //   // do something at end of scroll
    // }
  };
  render() {
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
            // onScroll={this.scollPos}
          >
            <tr className="fixed">
              <th>name</th>
              <th>height</th>
              <th>item height</th>
            </tr>
            {this.renderRows()}
          </table>
        </div>
      </div>
    );
  }
}

export default EmpDetails;
