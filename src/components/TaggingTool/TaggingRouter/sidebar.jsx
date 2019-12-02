import { NavLink } from "react-router-dom";
import React from "react";
import text from "../../../assets/language/en.js";

const links = [
  {
    label: text.home.sidebar.settings,
    link: "/taggingTool/settings",
    links: [
      {
        label: text.home.sidebar.data,
        link: "/taggingTool/settings/upload"
      },
      {
        label: text.home.sidebar.headers,
        link: "/taggingTool/settings/headers"
      },
      {
        label: text.home.sidebar.classification,
        link: "/taggingTool/settings/classification"
      },
      {
        label: text.home.sidebar.tokensNumber,
        link: "/taggingTool/settings/tokensNumber"
      },
      {
        label: text.home.sidebar.similarity,
        link: "/taggingTool/settings/similarity"
      },
      {
        label: text.home.sidebar.pattern,
        link: "/taggingTool/settings/pattern"
      },
      {
        label: text.home.sidebar.overview,
        link: "/taggingTool/settings/overview"
      }
    ]
  },
  {
    label: text.home.sidebar.tag,
    link: "/taggingTool/tag",
    links: [
      {
        label: text.home.sidebar.singleWord,
        link: "/taggingTool/tag/single"
      },
      {
        label: text.home.sidebar.multiWord,
        link: "/taggingTool/tag/multi"
      }
    ]
  },
  {
    label: text.home.sidebar.report,
    link: "/taggingTool/report",
    links: []
  },
  {
    label: text.home.sidebar.export,
    link: "/taggingTool/export",
    links: []
  }
];
const Sidebar = () => {
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
export default Sidebar;
