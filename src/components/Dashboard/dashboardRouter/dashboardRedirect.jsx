import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

/**
 * Component for the Upload link.
 * 
 * @component
 */
class DashboardRedirect extends Component {

    /**
     * The render function.
     */
    render() {
        return (
            <Redirect to='/dashboard/settings/dashboardHeaders' />
        )
    }
}
export default (DashboardRedirect);