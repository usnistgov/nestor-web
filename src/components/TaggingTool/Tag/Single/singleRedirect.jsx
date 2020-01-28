import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { updateSingleTokens, singleTokensRequest } from "./singleTokensAction";
import Alert from "../../../CommonComponents/Alert/alert";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import text from "../../../../assets/language/en.js";

class SingleRedirect extends Component
{
  handleContinue = history =>
  {
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.tagging.header,
      alertMessage: text.taggingTool.alerts.tagging.message
    };
    this.props.onUpdateAlert(alert);
    if (this.props.singleTokens.length > 1)
    {
      /* var index = [...this.props.singleTokens]
        .reverse()
        .findIndex(element => element.alias);
      var count = [...this.props.singleTokens].length - 1;
      var finalIndex = index >= 0 ? count - index : index;
      index = finalIndex === -1 ? 0 : finalIndex; */

      var index = [ ...this.props.singleTokens ].findIndex(
        element => !element.alias
      );
      if (index === -1)
      {
        index = 0;
      }
      history.push("/taggingTool/tag/single/" + index);
    } else
    {
      let alert = {
        showAlert: true,
        alertHeader: text.taggingTool.alerts.tagging.header,
        alertMessage: text.taggingTool.alerts.tagging.message
      };
      this.props.onUpdateAlert(alert);
    }
  };
  componentDidUpdate(prevProps)
  {
    if (prevProps.singleTokens !== this.props.singleTokens)
    {
      this.handleContinue(this.props.history);
    }
  }
  componentDidMount()
  {
    this.handleContinue(this.props.history);
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
  state => state.singleTokens,
  state => state.headers,
  (alert, singleTokens, headers) => ({
    alert,
    singleTokens,
    headers
  })
);
const mapActionsToProps = {
  onSingleTokensRequest: singleTokensRequest,
  onUpdateSingleTokens: updateSingleTokens,
  onUpdateAlert: updateAlert
};
export default connect(mapStateToProps, mapActionsToProps)(SingleRedirect);
