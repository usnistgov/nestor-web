import React, { Component } from "react";
import "./classification.css";
import Title from "../../../CommonComponents/Title/title";
import ClassificationTag from "./classificationTag";
import Button from "../../../CommonComponents/Button/button";
import Alert from "../../../CommonComponents/Alert/alert";
import text from "../../../../assets/language/en.js";
import { singleTokensRequest } from "../../Tag/Single/singleTokensAction";
import { getTokensNumber } from "../TokensNumber/tokensNumberAction";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import { connect } from "react-redux";
import { classificationRequest } from "./classificationAction";
import { createSelector } from "reselect";

class Classification extends Component
{
  componentDidMount()
  {
    if (!Object.keys(this.props.classification.types).length)
    {
      this.props.onClassificationRequest();
    }
    if (this.props.dragAndDrops.length)
    {
      if (this.props.dragAndDrops[ 0 ].file)
      {
        const headers = [ ...this.props.headers.headers ];
        var selectedHeadersLabels = [];
        var selectedHeaders = headers.filter(header =>
        {
          return header.checked === true;
        });
        selectedHeaders.forEach(header =>
        {
          selectedHeadersLabels.push(header.label);
        });
        if (!selectedHeaders.length && !this.props.alert.showAlert)
        {
          let alert = {
            showAlert: true,
            alertHeader: text.taggingTool.alerts.headers.header,
            alertMessage: text.taggingTool.alerts.headers.message
          };
          this.props.onUpdateAlert(alert);
        } else if (selectedHeaders.length && this.props.singleTokens.length === 0)
        {
          this.props.onSingleTokensRequest(selectedHeadersLabels);
        }
      } else
      {
        let alert = {
          showAlert: true,
          alertHeader: text.taggingTool.alerts.upload.header,
          alertMessage: text.taggingTool.alerts.upload.message
        };
        this.props.onUpdateAlert(alert);
      }
    } else
    {
      let alert = {
        showAlert: true,
        alertHeader: text.taggingTool.alerts.upload.header,
        alertMessage: text.taggingTool.alerts.upload.message
      };
      this.props.onUpdateAlert(alert);
    }
  }
  componentDidUpdate(prevProps)
  {
    if (prevProps.singleTokens !== this.props.singleTokens)
    {
      this.props.onGetTokensNumber(this.props.singleTokens.length);
    }
  }
  render()
  {
    return (
      <React.Fragment>
        { this.props.alert.showAlert && (
          <Alert
            alertHeader={ this.props.alert.alertHeader }
            alertMessage={ this.props.alert.alertMessage }
            styleColor="alert alert-danger"
            onDelete={ this.handleDelete }
          />
        ) }
        <Title
          title={ text.taggingTool.settings.classification.title }
          informationMessage={
            text.taggingTool.settings.classification.titleInfo
          }
        />
        <div className="setting-content">
          <div>
            { this.props.classification.types.map((obj, i) => (
              <ClassificationTag
                key={ i }
                label={ obj.shortkey + " - " + obj.label }
                color={ obj.color }
              />
            )) }
            { this.props.classification.rules.map((obj, i) => (
              <ClassificationTag
                key={ i }
                label={ obj.shortkey + " - " + obj.label }
                color={ obj.color }
              />
            )) }
          </div>
          <Button
            onClick={ this.handleContinue }
            class="btn btn-primary ctn"
            label="Continue"
          />
        </div>
      </React.Fragment>
    );
  }
  handleDelete = () =>
  {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
  };
  handleContinue = history =>
  {
    if (!this.props.alert.showAlert)
    {
      this.props.history.push("/taggingTool/settings/tokensNumber");
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
    tokensNumber
  ) => ({
    alert,
    classification,
    headers,
    dragAndDrops,
    singleTokens,
    tokensNumber
  })
);
const mapActionsToProps = {
  onClassificationRequest: classificationRequest,
  onSingleTokensRequest: singleTokensRequest,
  onGetTokensNumber: getTokensNumber,
  onUpdateAlert: updateAlert
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Classification);
