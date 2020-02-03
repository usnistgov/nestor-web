import React, { Component } from "react";
import "./header.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const tooltip = data => (
  <Tooltip id="tooltip">
    { data.map((obj, i) => (
      <strong key={ i }>{ obj }<br /></strong>
    )) }
  </Tooltip>
);
class Header extends Component
{
  render()
  {

    return (
      <label className="header-container">

        <OverlayTrigger
          placement="right"
          overlay={ tooltip(this.props.tooltip) }
        >
          <div
            id="label-text"
            onClick={ () => this.props.onCheck(this.props.header) }
          >
            { this.props.label }
          </div>
        </OverlayTrigger>

        <input type="checkbox" disabled={ this.props.disable } readOnly checked={ this.props.header.checked } />
        <span
          className="checkmark"
          onClick={ () => this.props.onCheck(this.props.header) }
        />
      </label>
    );
  }
}

export default Header;
