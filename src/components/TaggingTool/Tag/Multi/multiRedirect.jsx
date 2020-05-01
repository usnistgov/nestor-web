import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { classificationRequest } from "../../Settings/Classification/classificationAction";
import { multiTokensRequest } from "./multiTokensAction";
import Alert from "../../../CommonComponents/Alert/alert";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import text from "../../../../assets/language/en.js";

class MultiRedirect extends Component
{
  handleContinue = () =>
  {
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.tagging.header,
      alertMessage: text.taggingTool.alerts.tagging.message
    };
    this.props.onUpdateAlert(alert);
    if (this.props.singleTokens.length > 1 && this.props.multiTokens.length === 0)
    {
      this.props.onMultiTokensRequest(this.props.headers);
    } else
    {
      alert = {
        showAlert: true,
        alertHeader: text.taggingTool.alerts.tagging.header,
        alertMessage: text.taggingTool.alerts.tagging.message
      };
      this.props.onUpdateAlert(alert);
    }
    if (this.props.multiTokens.length > 1)
    {
      var index = [ ...this.props.multiTokens ].findIndex(
        element => element.classification.color === ""
      );
      if (index === -1)
      {
        index = 0;
      }
      this.props.history.push("/taggingTool/tag/multi/" + index);
    }
  };
  componentDidUpdate(prevProps)
  {
    if (prevProps.multiTokens !== this.props.multiTokens)
    {
      var index = [ ...this.props.multiTokens ].findIndex(
        element => element.classification.color === ""
      );
      this.props.history.push("/taggingTool/tag/multi/" + index);
    }
  }
  componentDidMount()
  {
    this.handleContinue();
  }
  render()
  {
    return (
      <div>
        { this.props.alert.showAlert && (
          <Alert
            alertHeader={ this.props.alert.alertHeader }
            alertMessage={ this.props.alert.alertMessage }
            styleColor="alert alert-warning"
            onDelete={ this.handleDelete }
          />
        ) }
        { !this.props.alert.showAlert && <div className="loader" /> }
      </div>
    );
  }
  handleDelete = () => { };
}
const mapStateToProps = createSelector(
  state => state.alert,
  state => state.multiTokens,
  state => state.singleTokens,
  state => state.classification,
  state => state.headers,
  (alert, multiTokens, singleTokens, classification, headers) => ({
    alert,
    multiTokens,
    singleTokens,
    classification,
    headers
  })
);
const mapActionsToProps = {
  onClassificationRequest: classificationRequest,
  onMultiTokensRequest: multiTokensRequest,
  onUpdateAlert: updateAlert
};
export default connect(mapStateToProps, mapActionsToProps)(MultiRedirect);
