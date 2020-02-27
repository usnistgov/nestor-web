import React, { Component } from "react";
import "./navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../.././assets/img/icon.png";
import text from "../../assets/language/en.js";
import PouchDB from "pouchdb";
import { createSelector } from "reselect";
import { connect } from "react-redux";


const links = [
  {
    label: text.home.navbar.home,
    link: "/",
    exact: true
  },
  {
    label: text.home.navbar.taggingTool,
    link: "/taggingTool",
    exact: false
  },
  {
    label: text.home.navbar.dashboard,
    link: "/dashboard",
    exact: false
  },
]
class NavBar extends Component
{
  state = { isSaving: false, projectName: "", projectNameUpdated: true };

  componentDidUpdate()
  {
    let projectName;
    projectName = this.props.dragAndDrops[ 0 ].file.name;
    if (projectName && this.state.projectNameUpdated)
    {
      this.setState({ projectNameUpdated: false, projectName: this.props.dragAndDrops[ 0 ].file.name.split(".")[ 0 ] })
    }
  }

  render()
  {
    return (<div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <img src={ logo } width="40" height="40" alt="logo" />
        </Navbar.Brand>
        <Nav className="fullWidth">
          { links.map((obj, i) => (
            <NavLink key={ i } exact={ obj.exact } className="nav-link" to={ obj.link }>
              { obj.label }
            </NavLink>
          )) }
          <div className="project-title">{ this.state.projectName }</div>
          <NavLink key={ 1000 } className="nav-link save-button" exact={ false } to={ '/save' } onClick={ this.handleSaveProject } >
            <i className="fas fa-save"></i>
            &nbsp;&nbsp;
            { text.home.navbar.save }
          </NavLink>
        </Nav>
      </Navbar>
    </div>)
  }

  handleSaveProject = () =>
  {
    try
    {
      const multi = this.props.ex.multi;
      const single = this.props.ex.single;
      const output = this.props.ex.output;
      const singleTokens = this.props.singleTokens;
      const tokensNumber = this.props.tokensNumber;
      window.db = new PouchDB("testdatabase");
      const projectId = this.props.dragAndDrops[ 0 ].file.name.split(".")[ 0 ];
      window.db.get(projectId).then(function (doc)
      {
        doc.multiToken = multi;
        doc.singleToken = single;
        doc.vocab = output;
        doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
        doc.tokensNumber = tokensNumber;
        return window.db.put(doc);
      }).catch(function (err)
      {
        console.log(err);
        console.log('No data entered at the beginning');
      }).then(function ()
      {
        return window.db.get(projectId);
      }).then(function (doc)
      {
        console.log(doc);
      });

    } catch (error)
    {
      console.log(error);
      // TODO : show modal of error
    }
  };
};
const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.export,
  state => state.singleTokens,
  state => state.tokensNumber,
  (dragAndDrops, ex, singleTokens, tokensNumber
  ) => ({
    dragAndDrops,
    ex,
    singleTokens,
    tokensNumber
  })
);
const mapActionsToProps = {
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(NavBar);
