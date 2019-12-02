import React, { Component } from "react";
import { Route } from "react-router-dom";

class Button extends Component {
  render() {
    return (
      <Route
        render={({ history }) => (
          <button
            type="button"
            className={this.props.class}
            onClick={() => this.props.onClick(history)}
          >
            {this.props.label}
          </button>
        )}
      />
    );
  }
}

export default Button;
