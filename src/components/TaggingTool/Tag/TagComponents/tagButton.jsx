import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const tooltip = data => (
  <Tooltip id="tooltip">
    <strong>{ data }</strong>
  </Tooltip>
);
class TagButton extends Component
{
  render()
  {
    return (
      <button
        type="button"
        className="btn"
        style={ this.props.style }
        onClick={ () => this.props.onClick(this.props) }
      >
        { this.props.value }
        { this.props.showTooltipIcon && (
          <OverlayTrigger
            placement="right"
            overlay={ tooltip(this.props.tooltip) }
          >
            <i className="far fa-question-circle" />
          </OverlayTrigger>
        ) }
        { this.props.showCloseIcon && (
          <i
            className="fa fa-times-circle"

          />
        ) }
      </button>
    );
  }
}

export default TagButton;
