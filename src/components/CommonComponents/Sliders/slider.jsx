import React, { Component } from "react";

/**
 * Component for Slider.
 * 
 * @component
 */
class Slider extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <div className="setting-content">
        <form>
          <div className="form-group">
            <input
              type="range"
              min="1"
              max="100"
              className="form-control-range"
              id="formControlRange"
              value={this.props.value}
              onChange={e => this.props.onUpdate(e)}
              disabled={this.props.disabled}
            />
          </div>
        </form>
        <div className="setting-title slider">
          <div className="slider-value">{this.props.value} %</div>
        </div>
      </div>
    );
  }
}

export default Slider;
