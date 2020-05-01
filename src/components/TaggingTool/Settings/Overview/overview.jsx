import React, { Component } from "react";
import "./overview.css";
import ClassificationTag from "../Classification/classificationTag";
import { classificationRequest } from "../Classification/classificationAction";
import OverviewHeader from "./overviewHeader";
import Button from "../../../CommonComponents/Button/button";
import text from "../../../../assets/language/en.js";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import DynamicSlider from "../../../CommonComponents/Sliders/dynamicSlider";
import { updateSingleTokensNumber } from "../TokensNumber/tokensNumberAction";


class Overview extends Component
{

  /** 
   * @constructor
  */
  constructor(props){
    super(props);
    this.state = {
      firstRow: [
        {
          title: text.taggingTool.settings.headers.name,
          link: "/taggingTool/settings/headers"
        },
        {
          title: text.taggingTool.settings.classification.name,
          link: "/taggingTool/settings/classification"
        }
      ],
      secondRow: []
    }
  }

  /**
   * A react lifecycle method called when the component did mount.
   * It initialize the components second row elements.
   */
  componentDidMount()
  {
    if (!Object.keys(this.props.classification.types).length)
    {
      this.props.onClassificationRequest();
    }
  }

  /**
   * The render function.
   */
  render()
  {
    return (
      <div className="overview-container">
        <div className="overview-col firstline">
          <div className="overview-item col1">
            <OverviewHeader
              title={ this.state.firstRow[ 0 ].title }
              link="/taggingTool/settings/headers"
            />
            <div className="overview-content">
              <ol>
                { this.props.headers.headers.map((header, i) => (
                  <li
                    key={ i }
                    style={
                      header.checked
                        ? { fontWeight: "bold" }
                        : { fontWeight: "normal" }
                    }
                  >
                    { header.label }{ " " }
                  </li>
                )) }
              </ol>
            </div>
          </div>

          <div className="overview-item col1">
            <OverviewHeader
              title="Classification"
              link="/taggingTool/settings/classification"
            />
            <div className="overview-title">Types</div>
            <div className="overview-classification-types">
              { this.props.classification.types.map((obj, i) => (
                <ClassificationTag
                  key={ i }
                  label={ obj.shortkey + " - " + obj.label }
                  color={ obj.color }
                />
              )) }
            </div>
            <div className="overview-classification-rules">
              <div className="overview-title">Rules</div>
              { this.props.classification.rules.map((obj, i) => (
                <ClassificationTag
                  key={ i }
                  label={ obj.shortkey + " - " + obj.label }
                  color={ obj.color }
                />
              )) }
            </div>
          </div>
        </div>
        <div className="overview-col">
          { this.state.secondRow.map((obj, i) => (
            <div className="overview-item col2" key={ i }>
              <OverviewHeader title={ obj.title } link={ obj.link } />
              <div className="set-size charts-container">
                <div className="pie-wrapper progress-45 style-2">
                  <span className="label">
                    { Math.round(obj.value) }
                    <span className="smaller">%</span>
                  </span>
                  <div className="pie" style={ obj.pie }>
                    <div className="left-side half-circle" style={ obj.left } />
                    <div className="right-side half-circle" style={ obj.right } />
                  </div>
                  <div className="shadow" />
                </div>
              </div>
            </div>
          )) }
          <div className="overview-item hour">
            {/* <OverviewHeader
              title="Estimated Duration"
              link="/taggingTool/settings/tokensNumber"
            /> */}
            <div className="overview-content overview-duration">
              <div className="overview-duration-txt">
                Estimated duration to tag the { this.props.tokensNumber.value } tokens with
                these settings { "(format : hh-mm-ss)" }
                <DynamicSlider
                slider={ this.props.tokensNumber }
                onUpdate={ this.handleUpdate }
              />
              </div>
              
              <div className="overview-duration-value">
                { new Date(this.props.tokensNumber.value * 5 * 1000)
                  .toISOString()
                  .substr(11, 8) }
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={ this.handleContinue }
          class="btn btn-primary ctn"
          label="Continue"
        />
      </div>
    );
  }

  /**
   * function that updates 
   * @param {event} e the event that is triggered when the user
   * changes the dynamic slider value
   * @function
   */
  handleUpdate = e =>
  {
    e.preventDefault();
    e.persist();
    const tokensNumber = { ...this.props.tokensNumber };
    var value = e.target.value;
    tokensNumber.value = value;
    this.props.onUpdateSingleTokensNumber(tokensNumber);
  };

  /**
   * function that redirect to the single tokens
   * @function
   */
  handleContinue = () =>
  {
    this.props.history.push("/taggingTool/tag/single");
  };
}
const mapStateToProps = createSelector(
  state => state.classification,
  state => state.headers,
  state => state.tokensNumber,
  state => state.similarity,
  state => state.pattern,
  state => state.singleTokens,
  (
    classification,
    headers,
    tokensNumber,
    similarity,
    pattern,
    singleTokens
  ) => ({
    classification,
    headers,
    tokensNumber,
    similarity,
    pattern,
    singleTokens
  })
);
const mapActionsToProps = {
  onClassificationRequest: classificationRequest,
  onUpdateSingleTokensNumber: updateSingleTokensNumber
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Overview);
