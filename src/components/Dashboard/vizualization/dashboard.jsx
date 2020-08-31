import React, { Component } from "react";
import "./dashboard.css";
import { getAssetSelected, getAssetsStats } from "./dashboardAction";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import {
  BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Tabs, Tab, Card } from "react-bootstrap";
import Alert from "../../CommonComponents/Alert/alert";


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
      colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#d92727']
    }
  }

  /**
   * A react lifecycle method called when the component did mount.
   * It loads the stats of the assets
   */
  componentDidMount() {
    if (this.props.dashboard.assetsStats.length === 0) {
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

  /**
   * The render function.
   */
  render() {
    return (
      <div>
        {this.props.dashboard.assetsStats.length > 1 ?
          <div>
            <div>This dashboard was created to show some vizualisations and statistics about the tokens you just tagged on the Tagging Tool section. You can tag other words and then come back to this dashboard.
            </div>
            <div className="dashboard-flexbox">
              <Card className="chart-container">
                <Card.Header as="h5">Number of related problems by assets</Card.Header>
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
                  <small className="text-muted">You can change this chart by clicking on the bars at the left</small>
                </Card.Footer>
              </Card>
            </div>
          </div>
          :
          <div className="alert-section"><Alert
            alertHeader="Dashboard not available"
            alertMessage="no dashboard available as you did not tagged any tokens"
            styleColor="alert alert-danger"
            onDelete={this.handleDelete}
          /></div>}
      </div>
    );
  }

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
  (dashboard, headers) => ({
    dashboard,
    headers
  })
);
const mapActionsToProps = {
  onGetAssetsStats: getAssetsStats,
  onGetAssetSelected: getAssetSelected
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);