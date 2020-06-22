import React from "react";
import "../App.css";
interface IProps {
  handleClose: () => void;
  show: boolean;
  children: any;
}
class PopUpModal extends React.Component<IProps, {}> {
  render() {
    return (
      <div
        // tabIndex={0}
        id="pop"
        className={this.props.show ? "d-block" : " d-none"}
        onBlur={this.props.handleClose}
      >
        <div className="modal-container">
          <a className="close" onClick={this.props.handleClose}>
            &times;
          </a>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default PopUpModal;
