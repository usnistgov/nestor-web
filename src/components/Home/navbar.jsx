import React, { Component } from "react";
import "./navbar.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../.././assets/img/icon.png";
import text from "../../assets/language/en.js";
import PouchDB from "pouchdb";
import { createSelector } from "reselect";
import { connect, connectAdvanced } from "react-redux";
import Modal from 'react-bootstrap/Modal';



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
  state = { isSaving: false, projectName: '', projectNameUpdated: true, showModal: false };

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
          <div className="project-title"><h4>{ this.handleDisplayProjectName(this.state.projectName) }</h4></div>
          <Button key={ 1000 } className="nav-link save-button" onClick={ this.handleSaveProject } disabled={ this.state.projectName === '' } >
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
      const singleTokens = this.props.singleTokens;
      const multi = this.props.multiTokens;
      const tokensNumber = this.props.tokensNumber;
      window.db = new PouchDB("testdatabase");
      const projectId = this.props.dragAndDrops[ 0 ].file.name.split(".")[ 0 ];
      window.db.get(projectId).then(function (doc)
      {
        doc.multiTokens = JSON.parse(JSON.stringify(multi));
        doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
        doc.tokensNumber = tokensNumber;
        return window.db.put(doc);
      }).catch((err) => 
      {
        console.log(err);
        console.log('No data entered at the beginning');
        this.handleHideModal();
        this.handleShowErrorModal();
      }).then(() =>
      {
        return window.db.get(projectId);
      });
    } catch (error)
    {
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
  (dragAndDrops, ex, singleTokens, tokensNumber, multiTokens
  ) => ({
    dragAndDrops,
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
