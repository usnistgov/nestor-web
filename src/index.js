import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import * as serviceWorker from "./serviceWorker";

import thunk from "redux-thunk";
import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import alertReducer from "./components/CommonComponents/Alert/alertReducer";
import uploadReducer from "./components/TaggingTool/Settings/Upload/uploadReducer";
import headersReducer from "./components/TaggingTool/Settings/Headers/headersReducer";
import classificationReducer from "./components/TaggingTool/Settings/Classification/classificationReducer";
import tokensNumberReducer from "./components/TaggingTool/Settings/TokensNumber/tokensNumberReducer";
import similarityReducer from "./components/TaggingTool/Settings/Similarity/similarityReducer";
import patternReducer from "./components/TaggingTool/Settings/Pattern/patternReducer";
import singleTokensReducer from "./components/TaggingTool/Tag/Single/singleTokensReducer";
import multiTokensReducer from "./components/TaggingTool/Tag/Multi/multiTokensReducer";
import reportReducer from "./components/TaggingTool/Report/reportReducer";
import exportReducer from "./components/TaggingTool/Export/exportReducer";
import dashboardReducer from "./components/Dashboard/vizualization/dashboardReducer"
import dashboardHeadersReducer from "./components/Dashboard/Settings/dashboardHeaders/dashboardHeadersReducer";

const allReducers = combineReducers({
  alert: alertReducer,
  dragAndDrops: uploadReducer,
  headers: headersReducer,
  classification: classificationReducer,
  tokensNumber: tokensNumberReducer,
  similarity: similarityReducer,
  pattern: patternReducer,
  singleTokens: singleTokensReducer,
  multiTokens: multiTokensReducer,
  report: reportReducer,
  export: exportReducer,
  dashboard: dashboardReducer,
  dashboardSettings: dashboardHeadersReducer
});
const allStoreEnhancers = compose(applyMiddleware(thunk));

const store = createStore(
  allReducers,
  {
    alert: {},
    dragAndDrops: [],
    headers: {
      headers: [],
      emptyColumns: []
    },
    classification: {
      types: [],
      rules: []
    },
    tokensNumber: {
      value: 0,
      maxValue: 0
    },
    similarity: 100,
    pattern: 80,
    singleTokens: [],
    multiTokens: [],
    report: {
      complete: 0,
      empty: 0,
      total: 0,
      ppv: [],
      tagged: 0
    },
    export: {
      output: [],
      single: [],
      multi: []
    },
    dashboard: {
      assetsStats: [],
      assetSelected: {
        label: "",
        problemsRelated: "",
        mostFoundProblems: [],
        mostFoundSolutions: [],
        mostFoundItems: []
      }
    },
    dashboardSettings: [
      { rowLabel: '', checkboxes: [{ label: '', checked: false }], tooltip: [] }
    ]
  },
  allStoreEnhancers
);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
