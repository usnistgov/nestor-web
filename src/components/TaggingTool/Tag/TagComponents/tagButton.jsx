import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./tag.css";

/**
 * TagButton component.
 * 
 * @component
 */
class TagButton extends Component
{

  /**
   * The render function.
   */
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
            overlay={ this.tooltip(this.props.tooltip) }
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

  /**
   * function that return a tooltip element with message in paramater
   * @param {string} data The text you want to write in the tooltip of a title
   * @function
   */
   tooltip = data => (
    <Tooltip id="tooltip" >
      { data.map((obj, i) => (
        <strong key={ i } >{ obj }<br /></strong>
      )) }
    </Tooltip>
  );
}

export default TagButton;
