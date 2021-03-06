import React, { Component } from "react";
import "./dashboard.css";
import { getAssetSelected, getAssetsStats } from "./dashboardAction";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import {
  BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Tabs, Tab, Card } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { updateAlert } from "../../CommonComponents/Alert/alertAction";


/**
 * Component for dashboard page.
 * 
 * @component
 */
class Dashboard extends Component {

  /** 
    * @constructor
    */
  constructor(props) {
    super(props);
    this.state = {
      assetsStats: [],
      assetSelected: {
        label: "",
        problemsRelated: "",
        mostFoundItems: [],
        mostFoundSolutions: [],
        mostFoundProblems: []
      },
      colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#d92727'],
      isMachineNameSelected: false
    }
  }

  /**
   * A react lifecycle method called when the component did mount.
   * It loads the stats of the assets
   */
  componentDidMount() {
    if (this.props.dashboard.assetsStats.length === 0 && this.props.singleTokens.length >= 1) {
      // TODO : pas faire ce call si jamais ya pas de singleTokens 
      this.props.onGetAssetsStats(this.props.dashboard.assetSelected);
    }
    if (this.props.dashboard.assetsStats) {
      const newAssetsStats = this.props.dashboard.assetsStats;
      this.setState({ assetsStats: newAssetsStats });
    }
    if (this.props.dashboard.assetSelected) {
      const newAssetSelected = this.props.dashboard.assetSelected;
      this.setState({ assetSelected: newAssetSelected });
    }
    this.isMachineNameSelected();
  }




  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboard.assetsStats) {
      this.setState({
        assetsStats: nextProps.dashboard.assetsStats
      });
    }
    if (nextProps.dashboard.assetSelected) {
      this.setState({
        assetSelected: nextProps.dashboard.assetSelected
      });
    }
  }

  isMachineNameSelected = () => {
    const newSettings = this.props.dashboardSettings;
    newSettings.forEach((element) => {
      element.checkboxes.forEach((checkbox) => {
        if (checkbox.label === "machineName" && checkbox.checked) {
          this.setState({ isMachineNameSelected: true });
          return true;
        }
      });
    });
  }

  /**
   * The render function.
   */
  render() {
    return (
      <div>
        {this.props.dashboard.assetsStats.length > 1 && this.state.isMachineNameSelected ?
          <div>
            <div>This dashboard was created to show some visualizations and statistics about the tokens you just tagged on the Tagging Tool section. You can tag other words and then come back to this dashboard.
            </div>
            <div className="dashboard-flexbox">
              <Card className="chart-container">
                <Card.Header as="h5">Number of work orders by assets</Card.Header>
                <Card.Body>
                  <ResponsiveContainer height={400}>
                    <BarChart
                      data={this.state.assetsStats}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="asset">
                      </XAxis>
                      <YAxis>
                      </YAxis>
                      <Tooltip />
                      <Bar onClick={this.onAssetBarClick} name="Number of related problems by assets" dataKey="problemsRelated"
                        fill="red"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
              <Card className="chart-container">
                <Card.Header as="h5">
                  Most viewed tokens related to asset {this.state.assetSelected.label}
                </Card.Header>
                <Card.Body>
                  <div>
                    <Tabs variant="tabs" >
                      <Tab eventKey="problems" title="problems">
                        <div>
                          <ResponsiveContainer height={300}>
                            <BarChart data={this.state.assetSelected.mostFoundProblems}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="token">
                              </XAxis>
                              <YAxis width={70}>
                                <Label angle={-90} value="scores" offset={20} position="insideBottomLeft" />
                              </YAxis>
                              <Tooltip />
                              <Bar onClick={this.onProblemScoreBarClick} name="scores" dataKey="value"
                                fill="#00A6FF"
                              />
                              <Tooltip />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Tab>
                      <Tab eventKey="items" title="items">
                        <div>
                          <ResponsiveContainer height={300}>
                            <BarChart data={this.state.assetSelected.mostFoundItems}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="token">
                              </XAxis>
                              <YAxis width={70}>
                                <Label angle={-90} value="scores" offset={20} position="insideBottomLeft" />
                              </YAxis>
                              <Tooltip />
                              <Bar onClick={this.onItemScoreBarClick} name="scores" dataKey="value"
                                fill="#FFBA5C"
                              />
                              <Tooltip />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Tab>
                      <Tab eventKey="solutions" title="solutions">
                        <div>
                          <ResponsiveContainer height={300}>
                            <BarChart data={this.state.assetSelected.mostFoundSolutions}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="token">
                              </XAxis>
                              <YAxis width={70}>
                                <Label angle={-90} value="scores" offset={20} position="insideBottomLeft" />
                              </YAxis>
                              <Tooltip />
                              <Bar onClick={this.onSolutionScoreBarClick} name="scores" dataKey="value"
                                fill="#77D353"
                              />
                              <Tooltip />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">You can change this chart by clicking on the bars on the left chart</small>
                </Card.Footer>
              </Card>
            </div>
          </div>
          :
          <Alert
            variant="danger">
            <Alert.Heading>
              Dashboard not available
            </Alert.Heading>
            No tokens tagged as a problem, please tag at least one problem from the tokens before you can see the charts or no columns selected as Machine names in previous tab.
          </Alert>}
      </div>
    );
  }

  /**
   * @function
   * function that handle the click on the bar and update the others charts
   * @param {event} event the event when a user click on a bar in the chart
   * containing the number of problems
   */
  onAssetBarClick = (event) => {
    const headers = [...this.props.headers.headers];
    var selectedHeadersLabels = [];
    var selectedHeaders = headers.filter(header => {
      return header.checked === true;
    });
    selectedHeaders.forEach(header => {
      selectedHeadersLabels.push(header.label);
    });
    this.props.onGetAssetSelected(this.props.dashboard.assetsStats, selectedHeadersLabels, event.asset, event.value);
  }
}

const mapStateToProps = createSelector(
  state => state.dashboard,
  state => state.headers,
  state => state.singleTokens,
  state => state.dashboardSettings,
  (dashboard, headers, singleTokens, dashboardSettings) => ({
    dashboard,
    headers,
    singleTokens,
    dashboardSettings
  })
);
const mapActionsToProps = {
  onGetAssetsStats: getAssetsStats,
  onGetAssetSelected: getAssetSelected,
  onUpdateAlert: updateAlert
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);