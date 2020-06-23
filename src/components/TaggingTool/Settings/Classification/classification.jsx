import React, { Component } from "react";
import "./classification.css";
import Title from "../../../CommonComponents/Title/title";
import ClassificationTag from "./classificationTag";
import Button from "../../../CommonComponents/Button/button";
import Alert from "../../../CommonComponents/Alert/alert";
import text from "../../../../assets/language/en.js";
import { singleTokensRequest } from "../../Tag/Single/singleTokensAction";
import { multiTokensRequest } from "../../Tag/Multi/multiTokensAction";
import { getTokensNumber } from "../TokensNumber/tokensNumberAction";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import { connect } from "react-redux";
import { classificationRequest } from "./classificationAction";
import { createSelector } from "reselect";

/**
 * Component for Classification page.
 * 
 * @component
 */
class Classification extends Component {

  /** 
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      classification: {
        rules: [],
        types: []
      }
    }
  }

  /**
   * A react lifecycle method called when the component did mount.
   * It gets the classification rules and types from the 
   * python script, checks whether or not to display an alert
   * and then request the singleTokens and the multiTokens
   */
  componentDidMount() {
    this.updateClassification();
    if (!Object.keys(this.props.classification.types).length) {
      this.props.onClassificationRequest();
      this.updateClassification();
    }
    if (this.props.dragAndDrops.length) {
      if (this.props.dragAndDrops[0].file) {
        const headers = [...this.props.headers.headers];
        var selectedHeadersLabels = [];
        var selectedHeaders = headers.filter(header => {
          return header.checked === true;
        });
        selectedHeaders.forEach(header => {
          selectedHeadersLabels.push(header.label);
        });
        if (!selectedHeaders.length && !this.props.alert.showAlert) {
          let alert = {
            showAlert: true,
            alertHeader: text.taggingTool.alerts.headers.header,
            alertMessage: text.taggingTool.alerts.headers.message
          };
          this.props.onUpdateAlert(alert);
        } else if (selectedHeaders.length && this.props.singleTokens.length === 0) {
          this.props.onSingleTokensRequest(selectedHeadersLabels);
          this.props.onMultiTokensRequest(selectedHeadersLabels);
        }
      } else {
        let alert = {
          showAlert: true,
          alertHeader: text.taggingTool.alerts.upload.header,
          alertMessage: text.taggingTool.alerts.upload.message
        };
        this.props.onUpdateAlert(alert);
      }
    } else {
      let alert = {
        showAlert: true,
        alertHeader: text.taggingTool.alerts.upload.header,
        alertMessage: text.taggingTool.alerts.upload.message
      };
      this.props.onUpdateAlert(alert);
    }
  }

  /**
   * A react lifecycle method called when the component did update.
   * It checks if the singleTokens props has changed and then 
   * get the tokens number with the new singleTokens.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.singleTokens !== this.props.singleTokens) {
      this.props.onGetTokensNumber(this.props.singleTokens.length);
      this.updateClassification();
    }
  }

  /**
   * The render function.
   */
  render() {
    return (
      <React.Fragment>
        {this.props.alert.showAlert && (
          <Alert
            alertHeader={this.props.alert.alertHeader}
            alertMessage={this.props.alert.alertMessage}
            styleColor="alert alert-danger"
            onDelete={this.handleDelete}
          />
        )}
        <div className="classifications-container">
          <div className="regular-classification">
            <Title
              title={text.taggingTool.settings.classification.title}
              informationMessage={
                text.taggingTool.settings.classification.titleInfo
              }
            />
            <div>
              {this.props.classification.types.map((obj, i) => (
                <div key={i} className="types-container">
                  <ClassificationTag
                    key={i}
                    label={obj.shortkey + " - " + obj.label}
                    color={obj.color}
                  />
                </div>
              ))}

            </div>
            <br />
            <Button
              onClick={this.handleContinue}
              class="btn btn-primary ctn"
              label="Continue"
            />
          </div>

          <div className="hybrid-classification">
            <Title
              title="Hybrid classification"
              informationMessage="These classifications iare used for multi words tokens"
            />
            {this.state.classification.rules.map((obj, i) => (
              <div key={i} className="rules-container">
                <ClassificationTag
                  key={i}
                  label={obj.shortkey + " - " + obj.label}
                  color={obj.color}
                />
                <div className="center"><i className="fas fa-equals"></i></div>
                <ClassificationTag
                  key={i + 2000}
                  label={obj.composedBy[0].shortkey + " - " + obj.composedBy[0].label}
                  color={obj.composedBy[0].color}
                />
                <div className="center"><i className="fas fa-plus"></i></div>
                <ClassificationTag
                  key={i + 1001}
                  label={obj.composedBy[1].shortkey + " - " + obj.composedBy[1].label}
                  color={obj.composedBy[1].color}
                />
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }

  /**
   * function that update the component's state classification
   * to basically display the explanations of the hybrids classifications
   * composition
   * @function
   */
  updateClassification = () => {
    if (this.props.classification.rules.length !== 0) {
      let newClassification = this.props.classification;
      newClassification.rules[0].composedBy = [this.props.classification.types[1], this.props.classification.types[0]];
      newClassification.rules[1].composedBy = [this.props.classification.types[2], this.props.classification.types[0]];
      this.setState({ classification: newClassification });
    }
  }

  /**
   * function that hide the alert message
   * @function
   */
  handleDelete = () => {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
  };

  /**
   * function that redirect to the overview tab if the alert is not active
   * @function
   */
  handleContinue = () => {
    if (!this.props.alert.showAlert) {
      this.props.history.push("/taggingTool/settings/overview")
    }
  };
}

const mapStateToProps = createSelector(
  state => state.alert,
  state => state.classification,
  state => state.headers,
  state => state.dragAndDrops,
  state => state.singleTokens,
  state => state.tokensNumber,
  (
    alert,
    classification,
    headers,
    dragAndDrops,
    singleTokens,
    tokensNumber,
  ) => ({
    alert,
    classification,
    headers,
    dragAndDrops,
    singleTokens,
    tokensNumber,
  })
);
const mapActionsToProps = {
  onClassificationRequest: classificationRequest,
  onSingleTokensRequest: singleTokensRequest,
  onGetTokensNumber: getTokensNumber,
  onUpdateAlert: updateAlert,
  onMultiTokensRequest: multiTokensRequest
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Classification);
