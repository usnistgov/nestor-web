import React, { Component } from "react";
import "./report.css";
import { Bar } from "react-chartjs-2";
import { getCompleteness, initReport } from "./reportAction";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { ProgressBar } from "react-bootstrap";
import text from "../../../assets/language/en.js";
import Alert from "../../CommonComponents/Alert/alert";
import { updateAlert } from "../../CommonComponents/Alert/alertAction";

class Report extends Component {
  state = {
    bar: {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1],
      datasets: [
        {
          label: text.taggingTool.report.thirdRow.title,
          data: this.props.report.ppv
        }
      ]
    }
  };
  componentDidMount() {
    //this.props.onInitReport();
    if (this.props.singleTokens.length) {
      let alert = {
        showAlert: false,
        alertHeader: text.taggingTool.alerts.tagging.header,
        alertMessage: text.taggingTool.alerts.tagging.message
      };
      this.props.onUpdateAlert(alert);
      this.props.onGetCompleteness();
    } else {
      let alert = {
        showAlert: true,
        alertHeader: text.taggingTool.alerts.tagging.header,
        alertMessage: text.taggingTool.alerts.tagging.message
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
            {/* {!this.props.report.total && <div className="loader" />} */}
            {/* {!!this.props.report.total && ( */}
            <div className="report-container">
              <div className="report-col">
                <div className="report-title">
                  {text.taggingTool.report.firstRow.title}
                </div>
                <div className="report-row">
                  <div className="report-title">
                    {text.taggingTool.report.firstRow.tagged}{" "}
                    {this.props.report.tagged}
                  </div>
                  <div className="report-title">
                    {text.taggingTool.report.firstRow.notTagged}{" "}
                    {this.props.tokensNumber.maxValue -
                      this.props.report.tagged}
                  </div>
                </div>

                <div className="set-size charts-container">
                  <div className="pie-wrapper progress-45 style-2">
                    <span className="label">
                      {this.props.report.tagged}
                      <span className="smaller">
                        {(
                          (this.props.report.tagged /
                            this.props.tokensNumber.maxValue) *
                          100
                        ).toFixed(2)}{" "}
                        %
                      </span>
                    </span>
                    <div
                      className="pie"
                      style={
                        (this.props.report.tagged /
                          this.props.tokensNumber.value) *
                          100 <=
                        50
                          ? {}
                          : { clip: "rect(auto, auto, auto, auto)" }
                      }
                    >
                      <div
                        className="left-side half-circle"
                        style={{
                          transform:
                            "rotate(" +
                            3.6 *
                              ((this.props.report.tagged /
                                this.props.tokensNumber.value) *
                                100) +
                            "deg)",
                          WebkitTransform:
                            "rotate(" +
                            3.6 *
                              ((this.props.report.tagged /
                                this.props.tokensNumber.value) *
                                100) +
                            "deg)"
                        }}
                      />
                      <div
                        className="right-side half-circle"
                        style={
                          (this.props.report.tagged /
                            this.props.tokensNumber.value) *
                            100 <=
                          50
                            ? { display: "none" }
                            : {
                                transform: "rotate(" + 180 + "deg)",
                                WebkitTransform: "rotate(" + 180 + "deg)"
                              }
                        }
                      />
                    </div>
                    <div className="shadow" />
                  </div>
                </div>
              </div>
              <div className="report-col">
                <div className="report-row">
                  <div className="report-title">
                    {text.taggingTool.report.firstRow.tags}{" "}
                    {this.props.report.tagged}
                  </div>
                  <div className="report-title">
                    {text.taggingTool.report.firstRow.autoTagged}{" "}
                    {this.props.report.taggedWords}
                  </div>
                </div>
              </div>
              <div className="report-col">
                <div className="report-title">
                  {text.taggingTool.report.secondRow.title}
                </div>
                <div className="report-row">
                  <div className="report-title">
                    {text.taggingTool.report.secondRow.complete}{" "}
                    {this.props.report.total === this.props.report.empty
                      ? 0
                      : this.props.report.complete}
                  </div>
                  <div className="report-title">
                    {text.taggingTool.report.secondRow.partlyTagged}{" "}
                    {this.props.report.total === this.props.report.empty
                      ? 0
                      : this.props.report.total -
                        this.props.report.empty -
                        this.props.report.complete}
                  </div>
                  <div className="report-title">
                    {text.taggingTool.report.secondRow.empty}{" "}
                    {this.props.report.empty}
                  </div>
                </div>
                <div>
                  <ProgressBar>
                    <ProgressBar
                      striped
                      variant="success"
                      now={
                        this.props.report.total === this.props.report.empty
                          ? 0
                          : (this.props.report.complete /
                              this.props.report.total) *
                            100
                      }
                      label={
                        this.props.report.total === this.props.report.empty
                          ? 0
                          : (
                              (this.props.report.complete /
                                this.props.report.total) *
                              100
                            ).toFixed(2) + " %"
                      }
                      key={1}
                    />
                    <ProgressBar
                      variant="warning"
                      now={
                        this.props.report.total === this.props.report.empty
                          ? 0
                          : ((this.props.report.total -
                              this.props.report.empty -
                              this.props.report.complete) /
                              this.props.report.total) *
                            100
                      }
                      label={
                        this.props.report.total === this.props.report.empty
                          ? 0
                          : (
                              ((this.props.report.total -
                                this.props.report.empty -
                                this.props.report.complete) /
                                this.props.report.total) *
                              100
                            ).toFixed(2) + " %"
                      }
                      key={2}
                    />
                    <ProgressBar
                      striped
                      variant="danger"
                      now={
                        (this.props.report.empty / this.props.report.total) *
                        100
                      }
                      label={
                        (
                          (this.props.report.empty / this.props.report.total) *
                          100
                        ).toFixed(2) + " %"
                      }
                      key={3}
                    />
                  </ProgressBar>
                </div>
              </div>
              <div className="report-col">
                <Bar data={this.state.bar} />
              </div>
            </div>
            {/* )} */}
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
  (alert, report, singleTokens, tokensNumber) => ({
    alert,
    report,
    singleTokens,
    tokensNumber
  })
);
const mapActionsToProps = {
  onGetCompleteness: getCompleteness,
  onInitReport: initReport,
  onUpdateAlert: updateAlert
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Report);
