import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Table from "react-bootstrap/Table"
import Form from 'react-bootstrap/Form'
import { updateDashboardHeaders, getDashboardHeaders } from "./dashboardHeadersAction"
import Button from "../../../CommonComponents/Button/button"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import "./dashboardHeaders.css"
import Alert from "../../../CommonComponents/Alert/alert";
import { Card } from "react-bootstrap";

class dashboardHeaders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHeaders: ["", "Machine name", "Technician name", "N/A"],
            dashboardSettings: [...this.props.dashboardSettings]
        }
    }

    componentDidMount() {
        if (this.props.dashboardSettings.length < 2) {
            this.props.onGetDashboardHeaders();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.dashboardSettings.length !== this.props.dashboardSettings.length) {
            this.setState({ dashboardSettings: this.props.dashboardSettings });
        }
    }

    render() {

        return (
            <React.Fragment>
                {this.props.dashboardSettings.length > 1 ?
                    <div>
                        <Card className="table-container">
                            <Card.Header as="h5">
                                Please map the headers of your data to the following columns below :
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Table hover bordered striped responsive>
                                        <thead>
                                            <tr>
                                                {this.state.tableHeaders.map((header, i) => (
                                                    <th key={i}>{header}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.dashboardSettings.map((setting, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <OverlayTrigger
                                                            placement="right"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={this.renderTooltip(setting.tooltip)}>
                                                            <div className="dataHeader">
                                                                {setting.rowLabel}
                                                            </div>
                                                        </OverlayTrigger>
                                                    </td>
                                                    {setting.checkboxes && setting.checkboxes.map((checkbox, j) => (
                                                        <td key={j}>
                                                            {this.state.dashboardSettings[i] &&
                                                                this.state.dashboardSettings[i].checkboxes[j] &&
                                                                setting.checkboxes[j] && <Form.Check
                                                                    name={i}
                                                                    custom
                                                                    type="radio"
                                                                    label=""
                                                                    id={checkbox.label + " " + setting.rowLabel}
                                                                    onChange={() => this.handleChange(i, j)}
                                                                    checked={this.state.dashboardSettings[i].checkboxes[j].checked}
                                                                />}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>

                        <Button
                            onClick={this.handleContinue}
                            class="btn btn-primary ctn"
                            label="Continue"
                        /></div> : <div className="alert-section"><Alert
                            alertHeader="Dashboard not available"
                            alertMessage="there is no data in the current project, please create one before
                            we can create the dashboard"
                            styleColor="alert alert-danger"
                            onDelete={this.handleDelete}
                        /></div>}
            </React.Fragment>
        );
    }

    renderTooltip(tooltipMessage) {
        return (
            <Tooltip id="button-tooltip" >
                {tooltipMessage.map((obj, i) => (
                    <strong key={i}>{obj}<br /></strong>
                ))}
            </Tooltip>)
    }

    handleChange = (line, column) => {
        const newSettings = this.state.dashboardSettings;
        newSettings.forEach((element, index) => {
            if (index === line) {
                element.checkboxes.forEach((checkbox, index2) => {
                    if (index2 === column) {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                    }
                });
            }
        });
        this.setState({ dashboardSettings: newSettings }, this.prepareSettingsToUpdate(this.state.dashboardSettings));
    }

    prepareSettingsToUpdate(dashboardSettings) {
        let res = {
            NA: [],
            machineName: [],
            technicianName: []
        }
        dashboardSettings.forEach(rowSetting => {
            rowSetting.checkboxes.filter((checkbox) => {
                if (checkbox.checked) {
                    switch (checkbox.label) {
                        case "technicianName":
                            res.technicianName.push(rowSetting.rowLabel);
                            break;
                        case "machineName":
                            res.machineName.push(rowSetting.rowLabel);
                            break;
                        case "NA":
                            res.NA.push(rowSetting.rowLabel);
                            break;
                        default:
                            break;
                    }
                }
                return true;
            });
        });
        this.props.onUpdateDashboardHeaders(res);
    }

    handleContinue = () => {
        this.props.history.push("/dashboard/vizualisation");
    }
}
const mapStateToProps = createSelector(
    state => state.headers,
    state => state.dashboardSettings,
    (headers, dashboardSettings) => ({
        headers,
        dashboardSettings
    })
);
const mapActionsToProps = {
    onUpdateDashboardHeaders: updateDashboardHeaders,
    onGetDashboardHeaders: getDashboardHeaders
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(dashboardHeaders);
