import React, { Component } from "react";
import "./classificationTag.css";

/**
 * Component for classificationTag.
 * 
 * @component
 */
class ClassificationTag extends Component {

  styles = {
    borderColor: this.props.color,
    display: this.props.display
  };

  /**
   * The render function.
   */
  render() {
    return (
      <span>
        <span style={this.styles} className="badge badge-primary badge-lg">
          <span>{this.props.label}</span>
        </span>
      </span>
    );
  }
}

export default ClassificationTag;
