import React, { Component } from "react";
import "../Similarity/similarity.css";
import Title from "../../../CommonComponents/Title/title";
import Button from "../../../CommonComponents/Button/button";
import text from "../../../../assets/language/en.js";
import Slider from "../../../CommonComponents/Sliders/slider";
import { connect } from "react-redux";
import { updatePattern } from "./patternAction";
import { createSelector } from "reselect";

class Pattern extends Component {

  render() {
    return (
      <React.Fragment>
        <Title
          title={text.taggingTool.settings.pattern.title}
          informationMessage={text.taggingTool.settings.pattern.titleInfo}
        />
        <Slider value={this.props.pattern} onUpdate={this.handleUpdate} />
        <Button onClick={this.handleContinue} class="btn btn-primary ctn" label="Continue" />
      </React.Fragment>
    );
  }
  handleContinue = history => {
    history.push("/taggingTool/settings/overview");
  };
  handleUpdate = e => {
    e.preventDefault();
    e.persist();
    var value = e.target.value;
    this.props.onUpdatePattern(value)
  };
}
const mapStateToProps = createSelector(
    state => state.pattern,
    (pattern) => ({
        pattern
    })
);
const mapActionsToProps = {
    onUpdatePattern: updatePattern
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(Pattern);