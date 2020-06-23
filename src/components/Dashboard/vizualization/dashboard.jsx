import React, { Component } from "react";
import "./dashboard.css";
import { getAssetSelected, getAssetsStats } from "./dashboardAction";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import {
  BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { Tabs, Tab } from "react-bootstrap";


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
    console.log(this.props.dashboard);
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
      <div className="dashboard-container">
        {this.state.assetsStats &&
          <div>
            Asset : {this.state.assetSelected.label}<br />
          Problems related : {this.state.assetSelected.problemsRelated}<br />

            <BarChart
              width={500}
              height={300}
              data={this.state.assetsStats}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="asset">
                <Label value="Assets" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis width={70}>
                <Label angle={-90} value="Number of problems" offset={20} position="insideBottomLeft" />
              </YAxis>
              <Tooltip />
              {/* <defs>
            <linearGradient id="problemsRelated" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#540d6e" />
              <stop offset="25%" stopColor="#c14bbb" />
              <stop offset="50%" stopColor="#ff0000" />
              <stop offset="75%" stopColor="#ff8317" />
              <stop offset="100%" stopColor="#ffdd21" />
            </linearGradient>
          </defs> */}
              {/* <Area onClick={this.onBarClick} name="Number of related problems by assets" dataKey="problemsRelated"
            stroke="url(#problemsRelated)" fill="url(#problemsRelated)"
          /> */}
              <Bar onClick={this.onBarClick} name="Number of related problems by assets" dataKey="problemsRelated"
                fill="red"
              />
            </BarChart>
          </div>}
        <div>
          <Tabs variant="tabs" >
            <Tab eventKey="problems" title="problems">
              <div>
                <BarChart width={500} height={300} data={this.state.assetSelected.mostFoundProblems}>
                  {/* <Bar dataKey="value" startAngle={180} endAngle={0} data={this.state.assetSelected.mostFoundProblems} cx={200} cy={200} outerRadius={80} label>
                    {
                      this.state.assetSelected.mostFoundProblems.map((entry, index) => <Cell key={index} fill={this.state.colors[index]} />)
                    }
                  </Bar> */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="token">

                  </XAxis>
                  <YAxis width={70}>
                    <Label angle={-90} value="scores" offset={20} position="insideBottomLeft" />
                  </YAxis>
                  <Tooltip />
                  <Bar name="scores" dataKey="value"
                    fill="#00A6FF"
                  />
                  <Tooltip />
                </BarChart>
              </div>
            </Tab>
            <Tab eventKey="items" title="items">
              <div>
                <BarChart width={500} height={300} data={this.state.assetSelected.mostFoundItems}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="token">
                  </XAxis>
                  <YAxis width={70}>
                    <Label angle={-90} value="scores" offset={20} position="insideBottomLeft" />
                  </YAxis>
                  <Tooltip />
                  <Bar name="scores" dataKey="value"
                    fill="#FFBA5C"
                  />
                  <Tooltip />
                </BarChart>
              </div>
            </Tab>
            <Tab eventKey="solutions" title="solutions">
              <div>
                <BarChart width={500} height={300} data={this.state.assetSelected.mostFoundSolutions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="token">
                  </XAxis>
                  <YAxis width={70}>
                    <Label angle={-90} value="scores" offset={20} position="insideBottomLeft" />
                  </YAxis>
                  <Tooltip />
                  <Bar name="scores" dataKey="value"
                    fill="#77D353"
                  />
                  <Tooltip />
                </BarChart>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
  onBarClick = (event) => {
    /* TODO :
    Commenter le code
    alias a la place des tokens
    et ensuite trier les alias si
    et rajouter des tabs Items / Problems / Solutions
    corriger les scores et ensuite store tout ca dans la bd 
    with the right graph : http://recharts.org/en-US/examples/BarChartWithCustomizedEvent
    */
    const headers = [...this.props.headers.headers];
    var selectedHeadersLabels = [];
    var selectedHeaders = headers.filter(header => {
      return header.checked === true;
    });
    selectedHeaders.forEach(header => {
      selectedHeadersLabels.push(header.label);
    });
    console.log(this.props);
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