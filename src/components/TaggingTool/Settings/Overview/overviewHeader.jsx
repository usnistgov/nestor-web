import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./overview.css";

/**
 * Component for the overview page's header.
 * 
 * @component
 */
class OverviewHeader extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <div className="overview-header">
        <div className="overview-title">{this.props.title}</div>
        <NavLink to={this.props.link}>
          <i className="far fa-edit" />
        </NavLink>
      </div>
    );
  }
}

export default OverviewHeader;
