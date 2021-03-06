import React, { Component } from "react";
import "./headers.css";
import "../../TaggingRouter/setting.css";
import Header from "./header";
import Title from "../../../CommonComponents/Title/title";
import Button from "../../../CommonComponents/Button/button";
import Alert from "../../../CommonComponents/Alert/alert";
import text from "../../../../assets/language/en.js";
import { connect } from "react-redux";
import { getHeaders, updateHeaders, headersRequest } from "./headersAction";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import { createSelector } from "reselect";

/**
 * Component for headers page.
 * 
 * @component
 */
class Headers extends Component {

  /**
   * A react lifecycle method called when the component did mount.
   * It update whether or not to display an alert
   * and request the python script to get the headers to display
   * or update them if props already have headers
   */
  componentDidMount() {
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.upload.header,
      alertMessage: text.taggingTool.alerts.upload.message
    };
    this.props.onUpdateAlert(alert);
    if (this.props.dragAndDrops[0].file.name) {
      if (this.props.headers.headers.length) {
        const emptyColumns = [...this.props.headers.emptyColumns];
        this.props.onUpdateHeaders(this.props.headers.headers, emptyColumns);
      } else if (this.props.dragAndDrops[0].file) {
        this.props.onHeadersRequest();
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
        <Title
          title={text.taggingTool.settings.headers.title}
          informationMessage={text.taggingTool.settings.headers.titleInfo}
        />
        <div className="setting-content">
          {this.props.headers.headers.map((header, i) => (
            <Header
              key={i}
              header={header}
              tooltip={header.tooltip}
              label={header.label}
              onCheck={this.handleCheck}
              disable={false}
            />
          ))}
          {this.props.headers.emptyColumns.length > 0 && (
            <div>
              <div className="subtitle-headers">
                {text.taggingTool.settings.headers.subtitle}
              </div>
              {this.props.headers.emptyColumns.map((header, i) => (
                <Header
                  key={i}
                  header={header}
                  tooltip={[text.taggingTool.settings.headers.emptyTooltip]}
                  label={header}
                  onCheck={this.handleCheck}
                  disable={true}
                />
              ))}
            </div>
          )}
        </div>
        <Button
          onClick={this.handleContinue}
          class="btn btn-primary ctn"
          label="Continue"
        />
      </React.Fragment>
    );
  }

  /**
   * function to hide the alert.
   * @function
   */
  handleDelete = () => {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
    this.props.onUpdateAlert(alert);
  };

  /**
   * function that redirect to the classification page
   * after a few checks
   * @function
   */
  handleContinue = () => {
    const headers = [...this.props.headers.headers];
    var selectedHeaders = [];
    selectedHeaders = headers.filter(header => {
      return header.checked === true;
    });
    if (!selectedHeaders.length && !this.props.alert.showAlert) {
      var alert = {
        showAlert: true,
        alertHeader: text.taggingTool.alerts.headers.header,
        alertMessage: text.taggingTool.alerts.headers.message
      };
      this.props.onUpdateAlert(alert);
    } else if (selectedHeaders.length) {
      this.props.history.push("/taggingTool/settings/classification");
    }
  };

  /**
   * function that update the headers in props when a header has been 
   * checked by the user
   * @param {header} header the header selected 
   * @function
   */
  handleCheck = header => {
    if (typeof header === "object") {
      const headers = [...this.props.headers.headers];
      const emptyColumns = [...this.props.headers.emptyColumns];
      const index = headers.indexOf(header);
      headers[index] = { ...header };

      if (headers[index].checked) {
        headers[index].checked = false;
      } else {
        headers[index].checked = true;
      }
      this.props.onUpdateHeaders(headers, emptyColumns);
    }
  };
}
const mapStateToProps = createSelector(
  state => state.headers,
  state => state.alert,
  state => state.dragAndDrops,
  (headers, alert, dragAndDrops) => ({
    headers,
    alert,
    dragAndDrops
  })
);
const mapActionsToProps = {
  onGetHeaders: getHeaders,
  onUpdateHeaders: updateHeaders,
  onUpdateAlert: updateAlert,
  onHeadersRequest: headersRequest
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Headers);
