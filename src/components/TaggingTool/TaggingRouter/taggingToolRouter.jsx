import React from "react";
import { Switch, Route } from "react-router-dom";
import "./taggingToolRouter.css";
import Sidebar from "./sidebar";
import UploadRedirect from "../Settings/Upload/uploadRedirect";
import Upload from "../Settings/Upload/upload";
import Headers from "../Settings/Headers/headers";
import Classification from "../Settings/Classification/classification";
import Overview from "../Settings/Overview/overview";
import TokensNumber from "../Settings/TokensNumber/tokensNumber";
import Similarity from "../Settings/Similarity/similarity";
import Pattern from "../Settings/Pattern/pattern";
import SingleWord from "../Tag/Single/singleWord";
import MultiWord from "../Tag/Multi/multiWord";
import MultiRedirect from "../Tag/Multi/multiRedirect";
import SingleRedirect from "../Tag/Single/singleRedirect";
import Report from "../Report/report";
import Export from "../Export/export";
/*import Search from "./tag/search";*/

const routes = [
  {
    path: "/taggingTool",
    component: UploadRedirect,
    exact: true
  },
  {
    path: "/taggingTool/settings",
    component: UploadRedirect,
    exact: true
  },
  {
    path: "/taggingTool/settings/upload",
    component: Upload,
    exact: false
  },
  {
    path: "/taggingTool/settings/headers",
    component: Headers,
    exact: false
  },
  {
    path: "/taggingTool/settings/classification",
    component: Classification,
    exact: false
  },
  {
    path: "/taggingTool/settings/overview",
    component: Overview,
    exact: false
  },
  {
    path: "/taggingTool/settings/tokensNumber",
    component: TokensNumber,
    exact: false
  }
  ,
  {
    path: "/taggingTool/settings/similarity",
    component: Similarity,
    exact: false
  },
  {
    path: "/taggingTool/settings/pattern",
    component: Pattern,
    exact: false
  },
  {
    path: "/taggingTool/tag",
    component: SingleRedirect,
    exact: true
  },
  {
    path: "/taggingTool/tag/single",
    component: SingleRedirect,
    exact: true
  },
  {
    path: "/taggingTool/tag/single/:id",
    component: SingleWord,
    exact: false
  },
  {
    path: "/taggingTool/tag/multi",
    component: MultiRedirect,
    exact: true
  },
  {
    path: "/taggingTool/tag/multi/:id",
    component: MultiWord,
    exact: false
  },
  {
    path: "/taggingTool/report",
    component: Report,
    exact: false
  },
  {
    path: "/taggingTool/export",
    component: Export,
    exact: false
  }
];
const TaggingTool = () => {
  return (
    <div className="tagging-container">
      <Sidebar />
      <div className="container">
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
    </div>
  );
};
export default TaggingTool;
