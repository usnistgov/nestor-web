import React, { Component } from "react";
import "./navbar.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../.././assets/img/icon.png";
import text from "../../assets/language/en.js";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Papa from "papaparse";
import PouchDB from "pouchdb";

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
  state = { isSaving: false, projectName: '', projectNameUpdated: true, showModal: false, hasStartedTagging: false };

  componentDidUpdate()
  {
    let projectName;
    projectName = this.props.dragAndDrops[ 0 ].file.name;
    const startedTagging = this.checkIfTagged();
    console.log(startedTagging);
    if (projectName && this.state.projectNameUpdated)
    {
      this.setState({ projectNameUpdated: false, projectName: this.props.dragAndDrops[ 0 ].file.name.split(".")[ 0 ], hasStartedTagging: startedTagging });
      console.log(startedTagging);
      console.log(this.state.hasStartedTagging);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("update : " +JSON.stringify((nextProps.singleTokens.length > 0 || nextProps.multiTokens.length > 0) && nextProps !== this.props));
    return (nextProps.singleTokens.length > 0 || nextProps.multiTokens.length > 0) && nextProps !== this.props || nextState.showModal !== this.state.showModal;
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
          <div className="project-title"><h4>{ this.handleDisplayProjectName(this.state.projectName) }</h4></div>
          <Button key={ 1000 } className="nav-link save-button" onClick={ this.handleSaveProject } disabled={ !this.state.hasStartedTagging } >
            <i className="fas fa-save"></i>
            &nbsp; &nbsp;
            { text.home.navbar.save }
          </Button>
        </Nav>
      </Navbar>
      <Modal
        show={ this.state.showModal }
        onHide={ this.handleHideModal }>
        <Modal.Header>
          <Modal.Title>
            <i className="fas fa-save"></i>
            &nbsp;
            Save succcessful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your project has beeen successfully saved. Next time, you can open the project using the dedicated button on the home page.
        </Modal.Body>
      </Modal>
      <Modal
        show={ this.state.showErrorModal }
        onHide={ this.handleHideErrorModal }>
        <Modal.Header>
          <Modal.Title>
            <i className="fas fa-exclamation-circle"></i>
            &nbsp;
            Save failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There has been an issue saving your project. You should restart the application. Sorry for the inconvenience.
        </Modal.Body>
      </Modal>
    </div >)
  }

  checkIfTagged = () => {
    console.log(this.props.singleTokens);
    console.log(this.props.singleTokens.length);
    console.log(this.props.singleTokens.length !==0);
    console.log(this.props.multiTokens);
    console.log(this.props.multiTokens.length);
    console.log(this.props.multiTokens.length !==0);
    console.log(this.props.singleTokens.length !==0 || this.props.multiTokens.length !== 0);
    return this.props.singleTokens.length !==0 || this.props.multiTokens.length !== 0; 
  }

  handleDisplayProjectName = (projectName) => {
    if(projectName.length >= 10){
      return projectName.substring(0,10).concat("...");
    }else {
      return projectName;
    }
  }

  handleHideModal = () =>
  {
    this.setState({ showModal: false });
  };
  handleShowModal = () =>
  {
    this.setState({ showModal: true });
  };
  handleHideErrorModal = () =>
  {
    this.setState({ showErrorModal: false });
  };
  handleShowErrorModal = () =>
  {
    this.setState({ showErrorModal: true });
  };


  handleSaveProject = () =>
  {
    try
    {
      this.handleShowModal();
      window.db = new PouchDB("testdatabase");
      let jsonToStore;
      const dragAndDrops = [ ...this.props.dragAndDrops ];
      Papa.parse(dragAndDrops[ 0 ].file, {
        complete: function (results)
        {
          jsonToStore = results;
        }
      });
      const singleTokens = this.props.singleTokens;
      const multi = this.props.multiTokens;
      const tokensNumber = this.props.tokensNumber;
      const headers = [ ...this.props.headers.headers ];
      window.db = new PouchDB("testdatabase");
      const projectId = this.props.dragAndDrops[ 0 ].file.name.split(".")[ 0 ];
      window.db.get(projectId).then(function (doc)
      {
        doc.inputData = jsonToStore;
        doc.multiTokens = JSON.parse(JSON.stringify(multi));
        doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
        doc.tokensNumber = tokensNumber;
        doc.headers = headers;
        return window.db.put(doc);
      }).catch(function (error)
      {
        console.log("creating new project : ".concat(projectId));
        return window.db.put({
          "_id": projectId,
          project_id: projectId,
          inputData: jsonToStore,
          multiTokens: JSON.parse(JSON.stringify(multi)),
          singleTokens: JSON.parse(JSON.stringify(singleTokens)),
          tokensNumber: tokensNumber,
          headers: headers
        });
      });
    } catch (error)
    {
      this.handleHideModal();
      this.handleShowErrorModal();
      console.log(error);
    }
  };
};
const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.export,
  state => state.singleTokens,
  state => state.tokensNumber,
  state => state.multiTokens,
  state => state.headers,
  (dragAndDrops, ex, singleTokens, tokensNumber, multiTokens, headers
  ) => ({
    dragAndDrops,
    headers,
    ex,
    singleTokens,
    tokensNumber,
    multiTokens
  })
);
const mapActionsToProps = {
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(NavBar);
