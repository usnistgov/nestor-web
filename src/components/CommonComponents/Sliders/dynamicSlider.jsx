import React, { Component } from "react";
import "./dynamicSlider.css";

/**
 * Component for Dynamic Slider.
 * 
 * @component
 */
class DynamicSlider extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <React.Fragment>
        <form className="form">
          <div className="form-group">
            <input
              type="range"
              min="1"
              max={this.props.slider.maxValue}
              className="form-control-range"
              id="formControlRange"
              value={this.props.slider.value}
              onChange={e => this.props.onUpdate(e)}
            />
          </div>
        </form>
        <div className="tokensNumber-label">
          Number of Tokens
        </div>
      </React.Fragment>
    );
  }
}

export default DynamicSlider;
