import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardSideBar from "../dashboardRouter/dashboardSidebar";
import Dashboard from "../vizualization/dashboard";
import DashboardRedirect from "../dashboardRouter/dashboardRedirect";
import DashboardHeaders from "../Settings/dashboardHeaders/dashboardHeaders";
import "./dashboardRouter.css"
/**
 * Constant of all the routes or the dashboard section 
 */
const dashboardRoutes = [
    {
        path: "/dashboard",
        component: DashboardRedirect,
        exact: true
    },
    {
        path: "/dashboard/settings",
        component: DashboardRedirect,
        exact: true
    },
    {
        path: "/dashboard/settings/dashboardHeaders",
        component: DashboardHeaders,
        exact: true
    },
    {
        path: "/dashboard/vizualisation",
        component: Dashboard,
        exact: false
    }
];

/**
 * Component for router of dahboard section.
 * 
 * @component
 */
const DashBoard = () => {
    return (
        <div className="dashboard-container">
            <DashboardSideBar />
            <div className="container">
                <Switch>
                    {dashboardRoutes.map((obj, i) => (
                        <Route
                            key={i}
                            exact={obj.exact}
                            path={obj.path}
                            component={obj.component}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    );
};
export default DashBoard;
