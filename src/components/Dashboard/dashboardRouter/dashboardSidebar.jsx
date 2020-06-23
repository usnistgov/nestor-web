import { NavLink } from "react-router-dom";
import React from "react";

/**
 * constant of all the links in the sidebar of the application
 */
const links = [
    {
        label: "Settings",
        link: "/dashboard/settings",
        links: [
            {
                label: "Data mapping",
                link: "/dashboard/settings/dashboardHeaders"
            }
        ]
    },
    {
        label: "Visualization",
        link: "/dashboard/vizualisation",
        links: []
    }
];

/**
 * Component for dashboard's sidebar.
 * 
 * @component
 */
const DashboardSidebar = () => {
    return (
        <div className="side-menu">
            <ol className="first-menu">
                {links.map((obj, i) => (
                    <li key={i}>
                        <NavLink to={obj.link}>{obj.label}</NavLink>
                        <ul className="second-menu">
                            {obj.links.map((obj, i) => (
                                <li key={i}>
                                    <NavLink to={obj.link}>{obj.label}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
};
export default DashboardSidebar;
