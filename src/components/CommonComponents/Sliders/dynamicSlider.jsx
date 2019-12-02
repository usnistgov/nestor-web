import React, { Component } from "react";
import text from "../../../assets/language/en.js";

/* const legend = {
  display: false,
  position: "top",
  fullWidth: true,
  reverse: false,
  labels: {
    fontColor: "rgb(255, 99, 132)"
  }
}; */
class DynamicSlider extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
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
        <div className="setting-subtitle">
          {text.taggingTool.settings.tokens.subtitle.message1}
          {this.props.slider.value}
          {text.taggingTool.settings.tokens.subtitle.message2}
          {this.props.slider.maxValue
            ? (
                (this.props.slider.value / this.props.slider.maxValue) *
                100
              ).toFixed(1)
            : 0}
          {text.taggingTool.settings.tokens.subtitle.message3}
        </div>
        {/* <div className="setting-content">
          <Doughnut
            data={this.props.slider.chart.data}
            legend={legend}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div> */}
      </React.Fragment>
    );
  }
}

export default DynamicSlider;
