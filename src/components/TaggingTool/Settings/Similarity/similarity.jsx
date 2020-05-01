import React, { Component } from "react";
import "./similarity.css";
import Title from "../../../CommonComponents/Title/title";
import Button from "../../../CommonComponents/Button/button";
import text from "../../../../assets/language/en.js";
import Slider from "../../../CommonComponents/Sliders/slider";
import { connect } from "react-redux";
import { updateSimilarity } from "./similarityAction";
import { createSelector } from "reselect";

/**
 * Component for similarity page.
 * 
 * @component
 */
class Similarity extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <React.Fragment>
        <Title
          title={text.taggingTool.settings.similarity.title}
          informationMessage={text.taggingTool.settings.similarity.titleInfo}
        />
        <Slider
          disabled={true}
          value={this.props.similarity}
          onUpdate={this.handleUpdate}
        />
        <Button
          onClick={this.handleContinue}
          class="btn btn-primary ctn"
          label="Continue"
        />
      </React.Fragment>
    );
  }

  /**
   * function that redirect to the overview page
   * @function
   */
  handleContinue = () => {
    this.props.history.push("/taggingTool/settings/overview");
  };

  /**
   * function that updates the value of the similarity props
   * @param {event} e the event triggered by the change of the value
   * of the dynamic slider
   * @function
   */
  handleUpdate = e => {
    e.preventDefault();
    e.persist();
    var value = e.target.value;
    this.props.onUpdateSimilarity(value);
  };
}

const mapStateToProps = createSelector(
  state => state.similarity,
  similarity => ({
    similarity
  })
);
const mapActionsToProps = {
  onUpdateSimilarity: updateSimilarity
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Similarity);
