import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { updateSingleTokens } from "./singleTokensAction";
import Alert from "../../../CommonComponents/Alert/alert";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import text from "../../../../assets/language/en.js";

/**
 * Component for redirecting single tokens.
 * 
 * @component
 */
class SingleRedirect extends Component
{

  /**
   * function which hhandle showing or not an alert about single tokens redirections
   * and also check where to redirect the user when clicking on continue 
   * @param {history} history History of navigation
   */
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
      var index = [ ...this.props.singleTokens ].findIndex(
        element => element.classification.color === ""
      );
      if (index === -1)
      {
        index = 0;
      }
      this.props.history.push("/taggingTool/tag/single/" + index);
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

    /**
   * A react lifecycle method called when the component did update.
   * if single tokens props changed, execute handleContinue to set the first token.
   */
  componentDidUpdate(prevProps)
  {
    if (prevProps.singleTokens !== this.props.singleTokens)
    {
      this.handleContinue(this.props.history);
    }
  }

    /**
   * A react lifecycle method called when the component did mount.
   * execute handleContinue to set the first token.
   */
  componentDidMount()
  {
    this.handleContinue(this.props.history);
  }

    /**
   * The render function.
   */
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
  onUpdateSingleTokens: updateSingleTokens,
  onUpdateAlert: updateAlert
};
export default connect(mapStateToProps, mapActionsToProps)(SingleRedirect);
