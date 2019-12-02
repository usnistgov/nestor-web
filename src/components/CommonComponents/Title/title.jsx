import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const tooltip = message => (
  <Tooltip id="tooltip">
    <strong>{message}</strong>
  </Tooltip>
);
class Title extends Component {
  render() {
    return (
      <div className="setting-title">
        {this.props.title}
        <OverlayTrigger
          placement="bottom"
          overlay={tooltip(this.props.informationMessage)}
        >
          <i className="fas fa-info-circle" />
        </OverlayTrigger>
      </div>
    );
  }
}

export default Title;
