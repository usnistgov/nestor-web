import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import text from "../../../assets/language/en.js";
import Alert from "../../CommonComponents/Alert/alert";
import { updateAlert } from "../../CommonComponents/Alert/alertAction";
import { CSVLink } from "react-csv";
import { exportOutput } from "./exportAction";

class Export extends Component {
  componentDidMount() {
    if (this.props.singleTokens.length) {
      let alert = {
        showAlert: false,
        alertHeader: text.taggingTool.alerts.export.header,
        alertMessage: text.taggingTool.alerts.export.message
      };
      this.props.onUpdateAlert(alert);
      this.props.onExportOutput();
    } else {
      let alert = {
        showAlert: true,
        alertHeader: text.taggingTool.alerts.export.header,
        alertMessage: text.taggingTool.alerts.export.message
      };
      this.props.onUpdateAlert(alert);
    }
  }
  render() {
    return (
      <div>
        {this.props.alert.showAlert && (
          <Alert
            alertHeader={this.props.alert.alertHeader}
            alertMessage={this.props.alert.alertMessage}
            styleColor="alert alert-warning"
            onDelete={this.handleDelete}
          />
        )}
        {!this.props.alert.showAlert && (
          <div>
            <div className="report-container">
              <div className="report-col">
                <div className="export-container">
                  <div className="report-title">
                    {text.taggingTool.export.firstRow}
                  </div>
                  <div>
                    <CSVLink
                      data={this.props.ex.output}
                      filename={"readable.csv"}
                    >
                      Download output file
                    </CSVLink>
                  </div>
                  <div>
                    <CSVLink
                      data={this.props.ex.single}
                      filename={"vocab1g.csv"}
                    >
                      Download vocab file single words
                    </CSVLink>
                  </div>
                  <div>
                    <CSVLink
                      data={this.props.ex.multi}
                      filename={"vocabng.csv"}
                    >
                      Download vocab file multi words
                    </CSVLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  handleDelete = () => {};
}

const mapStateToProps = createSelector(
  state => state.alert,
  state => state.report,
  state => state.singleTokens,
  state => state.tokensNumber,
  state => state.export,
  (alert, report, singleTokens, tokensNumber, ex) => ({
    alert,
    report,
    singleTokens,
    tokensNumber,
    ex
  })
);
const mapActionsToProps = {
  onUpdateAlert: updateAlert,
  onExportOutput: exportOutput
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Export);
