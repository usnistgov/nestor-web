import React, { Component } from "react";
import Title from "../../../CommonComponents/Title/title";
import DynamicSlider from "../../../CommonComponents/Sliders/dynamicSlider";
import Button from "../../../CommonComponents/Button/button";
import text from "../../../../assets/language/en.js";
import Alert from "../../../CommonComponents/Alert/alert";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import { singleTokensRequest } from "../../Tag/Single/singleTokensAction";
import { connect } from "react-redux";
import
{
  getTokensNumber,
  updateSingleTokensNumber,
  initTokensNumber
} from "./tokensNumberAction";
import { createSelector } from "reselect";

class TokensNumber extends Component
{
  componentDidUpdate(prevProps)
  {
    if (prevProps.singleTokens !== this.props.singleTokens)
    {
      this.props.onGetTokensNumber(this.props.singleTokens.length);
    }
  }
  componentDidMount()
  {
    ////debugger;
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.upload.header,
      alertMessage: text.taggingTool.alerts.upload.message
    };
    this.props.onUpdateAlert(alert);
    if (!this.props.tokensNumber.value)
    {
      //debugger;
      if (this.props.dragAndDrops.length)
      {
        //debugger;
        if (this.props.dragAndDrops[ 0 ].file)
        {
          //debugger;
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
            //debugger;
            let alert = {
              showAlert: true,
              alertHeader: text.taggingTool.alerts.headers.header,
              alertMessage: text.taggingTool.alerts.headers.message
            };
            this.props.onUpdateAlert(alert);
          } else if (selectedHeaders.length)
          {
            //debugger;
            if (this.props.singleTokens.length)
            {
              this.props.onSingleTokensRequest(selectedHeadersLabels);
            }
          }
        } else
        {
          //debugger;
          let alert = {
            showAlert: true,
            alertHeader: text.taggingTool.alerts.upload.header,
            alertMessage: text.taggingTool.alerts.upload.message
          };
          this.props.onUpdateAlert(alert);
        }
      } else
      {
        //debugger;
        let alert = {
          showAlert: true,
          alertHeader: text.taggingTool.alerts.upload.header,
          alertMessage: text.taggingTool.alerts.upload.message
        };
        this.props.onUpdateAlert(alert);
      }
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
          title={ text.taggingTool.settings.tokens.title }
          informationMessage={ text.taggingTool.settings.tokens.titleInfo }
        />
        <DynamicSlider
          slider={ this.props.tokensNumber }
          onUpdate={ this.handleUpdate }
        />
        <Button
          onClick={ this.handleContinue }
          class="btn btn-primary ctn"
          label="Continue"
        />
      </React.Fragment>
    );
  }
  handleDelete = () =>
  {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
    this.props.onUpdateAlert(alert);
  };
  handleUpdate = e =>
  {
    e.preventDefault();
    e.persist();
    const tokensNumber = { ...this.props.tokensNumber };
    var value = e.target.value;
    tokensNumber.value = value;
    this.props.onUpdateSingleTokensNumber(tokensNumber);
  };
  handleContinue = history =>
  {
    if (this.props.tokensNumber.value)
    {
      //put same checkings before redirecting
      this.props.history.push("/taggingTool/settings/overview");
    } else if (!this.props.alert.showAlert)
    {
      var alert = { ...this.props.alert };
      alert.showAlert = true;
      this.props.onUpdateAlert(alert);
    }
  };
}

const mapStateToProps = createSelector(
  state => state.alert,
  state => state.tokensNumber,
  state => state.headers,
  state => state.dragAndDrops,
  state => state.singleTokens,
  (alert, tokensNumber, headers, dragAndDrops, singleTokens) => ({
    alert,
    headers,
    dragAndDrops,
    tokensNumber,
    singleTokens
  })
);
const mapActionsToProps = {
  onGetTokensNumber: getTokensNumber,
  onUpdateSingleTokensNumber: updateSingleTokensNumber,
  onInitTokensNumber: initTokensNumber,
  onUpdateAlert: updateAlert,
  onSingleTokensRequest: singleTokensRequest
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(TokensNumber);
