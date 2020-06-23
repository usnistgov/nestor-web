import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

/**
 * Component for title.
 * 
 * @component
 */
class Title extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <div className="setting-title">
        {this.props.title}
        <OverlayTrigger
          placement="bottom"
          overlay={this.tooltip(this.props.informationMessage)}
        >
          <i className="fas fa-info-circle" />
        </OverlayTrigger>
      </div>
    );
  }

  /**
   * function that return a tooltip element with message in paramater
   * @param {string} message The text you want to write in the tooltip of a title
   * @function
   */
   tooltip = message => (
    <Tooltip id="tooltip">
      <strong>{message}</strong>
    </Tooltip>
  );
}

export default Title;
