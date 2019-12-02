import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import isElectron from "is-electron";
import { connect } from "react-redux";
import {
  setClassification,
  classificationRequest
} from "./components/TaggingTool/Settings/Classification/settingsAction";
import { update, apiRequest } from "./actions/userAction";
import { createSelector } from "reselect";

class App extends Component {
  constructor(props) {
    super(props);
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onSetClassification = this.onSetClassification.bind(this);
  }
  componentDidMount() {
    this.props.onClassificationRequest();
    this.props.onApiRequest();

    if (isElectron()) {
      /*
      const ipcRenderer = window.ipcRenderer;
      let reply = ipcRenderer.sendSync("ev", "A sync Event");
      console.log(reply);
      ipcRenderer.on("asyncReply", (event, arg) => {
        console.log(event, arg);
      });
      ipcRenderer.send("asynchronous-message", "Async msg");
      
      ipcRenderer.on("server", (event, message) => {
        console.log(message);
        if (message === "go") {
          this.setState({
            go: true
          });
        }
      });
      */
    }
  }
  onUpdateUser() {
    this.props.onUpdateUser();
  }
  onSetClassification() {
    this.props.onSetClassification();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" /*onClick={this.onSetClassification}*/>
          {Object.values(this.props.classification).map((keyName, i) => (
            <li key={i}>
              <span>
                key: {i} Name: {[keyName]}
              </span>
            </li>
          ))}
          {Object.values(this.props.user).map((keyName, i) => (
            <li key={i}>
              <span>
                key: {i} Name: {[keyName]}
              </span>
            </li>
          ))}
        </header>
      </div>
    );
  }
}

const classification = createSelector(
  state => state.classification,
  classification => classification
);

const userSelector = createSelector(
  state => state.user,
  user => user
);
const mapStateToProps = createSelector(
  state => state.user,
  state => state.classification,
  (user, classification) => ({
    user,
    classification
  })
);
const mapActionsToProps = {
  onSetClassification: setClassification,
  onClassificationRequest: classificationRequest,
  onUpdateUser: update,
  onApiRequest: apiRequest
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
