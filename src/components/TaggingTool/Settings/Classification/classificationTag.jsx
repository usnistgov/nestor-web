import React, { Component } from "react";
import "./classificationTag.css";

class ClassificationTag extends Component {
  styles = {
    borderColor: this.props.color,
    display: this.props.display
  };
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
