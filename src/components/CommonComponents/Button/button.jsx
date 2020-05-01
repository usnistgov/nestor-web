import React, { Component } from "react";
import { Route } from "react-router-dom";

/**
 * Component for button.
 * 
 * @component
 */
class Button extends Component {

  /**
   * The render function.
   */
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
