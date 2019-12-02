import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./overview.css";

class OverviewHeader extends Component {
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
