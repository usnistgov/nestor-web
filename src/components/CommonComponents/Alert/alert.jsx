import React, { Component } from "react";

class Alert extends Component {
  render() {
    /*const globalStyle = {
      color: "#4950579c",
      backgroundColor: "#ff660078",
      borderColor: "#4950579c"
    };*/
    const headerStyle = {
      display: "flex",
      justifyContent: "space-between"
    };
    return (
      <div className={this.props.styleColor} role="alert">
        <span className="alert-heading" style={headerStyle}>
          <span>{this.props.alertHeader}</span>
          <i
            className="far fa-times-circle"
            onClick={() => this.props.onDelete()}
          />
        </span>

        <span>{this.props.alertMessage}</span>
      </div>
    );
  }
}

export default Alert;
