import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomeComponent from "./components/Home/home";
import NavBar from "./components/Home/navbar";
import Error from "./components/CommonComponents/Error/error";
import Dashboard from "./components/Dashboard/dashboardRouter/dashboardRouter";
import TaggingTool from "./components/TaggingTool/TaggingRouter/taggingToolRouter";

/**
 * routes of the main router of the application
 */
const routes = [
  {
    path: "/",
    component: HomeComponent,
    exact: true
  },
  {
    path: "/taggingTool",
    component: TaggingTool,
    exact: false
  },
  {
    path: "/dashboard",
    component: Dashboard,
    exact: false
  },
  {
    path: "/error",
    component: Error,
    exact: false
  }
];

/**
 * Router component.
 * 
 * @component
 */
class Router extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <div className="content">
            <Switch>
              {routes.map((obj, i) => (
                <Route
                  key={i}
                  exact={obj.exact}
                  path={obj.path}
                  component={obj.component}
                />
              ))}
            </Switch>
          </div>
          <Redirect to="/" />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Router;
