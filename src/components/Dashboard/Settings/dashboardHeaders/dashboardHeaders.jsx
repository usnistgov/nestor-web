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
import Alert from "react-bootstrap/Alert";
import { Card } from "react-bootstrap";

/**
 * Component for dashboardHeaders page.
 * 
 * @component
 */
class dashboardHeaders extends Component {

    /** 
     * @constructor
    */
    constructor(props) {
        super(props);
        this.state = {
            tableHeaders: ["", "Machine name", "Technician name"],
            dashboardSettings: [...this.props.dashboardSettings]
        }
    }

    /**
   * A react lifecycle method called when the component did mount.
   * It init the dashboardHeaders props
   */
    componentDidMount() {
        if (this.props.dashboardSettings.length < 2) {
            this.props.onGetDashboardHeaders();
        }
    }

    /**
    * A react lifecycle method called when the component did update.
    * It sets the dashboardSettings props/state
    */
    componentDidUpdate(prevProps) {
        if (this.state.dashboardSettings.length !== this.props.dashboardSettings.length) {
            this.setState({ dashboardSettings: this.props.dashboardSettings });
        }
    }

    /**
    * The render function.
    */
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
                                <small>The only column that have an impact on the dashboard currently is the Machine name column. Technician name column is under development.</small>
                                <br />
                                <div className="table-container">
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
                                                                    type="checkbox"
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
                        /></div> : <Alert
                            variant="danger">
                        <Alert.Heading>
                            Dashboard not available
                            </Alert.Heading>
                            there is no data in the current project, please create one before
                            we can create the dashboard
                        </Alert>
                }
            </React.Fragment>
        );
    }

    /**
     * @function
     * function to render the tooltip from the argument
     * @param {string} tooltipMessage The text you want to write in the tooltip of a title
     */
    renderTooltip(tooltipMessage) {
        return (
            <Tooltip id="button-tooltip" >
                {tooltipMessage.map((obj, i) => (
                    <strong key={i}>{obj}<br /></strong>
                ))}
            </Tooltip>)
    }

    /**
     * @function
     * function handling the change when a user select a checkbox in the table of the dashboard Headers
     * @param {number} line the line of the header selected
     * @param {number} column the column of the header selected
     */
    handleChange = (line, column) => {
        const newSettings = this.state.dashboardSettings;
        newSettings.forEach((element, index) => {
            if (index === line) {
                element.checkboxes.forEach((checkbox, index2) => {
                    if (index2 === column) {
                        checkbox.checked = !checkbox.checked;
                    }
                });
            }
        });
        this.setState({ dashboardSettings: newSettings }, this.prepareSettingsToUpdate(this.state.dashboardSettings));
    }

    /**
     * @function
     * function that shaped the dashboard headers to send it to the python api
     * @param {array} dashboardSettings array containing the dashboard headers
     */
    prepareSettingsToUpdate(dashboardSettings) {
        let res = {
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
                        default:
                            break;
                    }
                }
                return true;
            });
        });
        this.props.onUpdateDashboardHeaders(res);
    }

    /**
     * function called when clicking on the continue button
     * it redirects to the dashboard tab
     * @function
     */
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
