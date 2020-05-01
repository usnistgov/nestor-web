import React, { Component } from "react";

/**
 * Component for alert.
 * 
 * @component
 */
class Alert extends Component {

  /**
   * The render function.
   */
  render() {
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
