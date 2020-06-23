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
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"

/**
 * constant of the links to home, tagging tool and dashboard page
 */
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
];

/**
 * Component for home page.
 * 
 * @component
 */
class NavBar extends Component {

  /** 
   * @constructor
   */
  constructor(props) {
    super(props);
    this.handleSaveProject = this.handleSaveProject.bind(this);
    this.state = { projectName: '', showModal: false, hasStartedTagging: false, showSuccessModal: false, customProjectName: "" };
  }

  /**
   * A react lifecycle method called when the component did update.
   * It checks if the dragAndDrops props changed and set state with right 
   * project Name and also disable the save button if needed
   */
  componentDidUpdate(prevProps) {
    if (this.props.dragAndDrops[0].projectName !== prevProps.dragAndDrops[0].projectName
      || this.props.dragAndDrops[0].projectName !== this.state.projectName) {
      this.setState({ projectName: this.props.dragAndDrops[0].projectName, customProjectName: this.props.dragAndDrops[0].projectName });
    } else if (this.props.dragAndDrops[0].projectName === "" && this.props.dragAndDrops[0].projectName !==
      prevProps.dragAndDrops[0].projectName) {
      this.setState({ projectName: "" });
    }
    if (this.props.singleTokens.length !== prevProps.singleTokens.length && this.props.singleTokens.length > 0) {
      this.setState({ hasStartedTagging: true });
    } else if (this.props.singleTokens.length !== prevProps.singleTokens.length && this.props.singleTokens.length === 0) {
      this.setState({ hasStartedTagging: false });
    }
  }

  /**
   * A react lifecycle method to determine whether or not the component should update
   * It checks if the dragAndDrops changed and return true if it changed 
   * @param {props} nextProps the new props of the application
   * @param {props} nextState the next state of the component
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dragAndDrops[0] && nextProps.dragAndDrops[0]) {
      return this.state.projectName !== nextProps.dragAndDrops[0].projectName
        || this.props.singleTokens.length !== nextProps.singleTokens.length
        || nextState.showModal !== this.state.showModal
        || nextState.showSuccessModal !== this.state.showSuccessModal;
    } else {
      return false;
    }
  }

  /**
   * The render function.
   */
  render() {
    return (<div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <img src={logo} width="40" height="40" alt="logo" />
        </Navbar.Brand>
        <Nav className="fullWidth">
          {links.map((obj, i) => (
            <NavLink key={i} exact={obj.exact} className="nav-link" to={obj.link}>
              {obj.label}
            </NavLink>
          ))}
          <div className="project-title"><h4>{this.handleDisplayProjectName(this.state.projectName)}</h4></div>
          <Button key={1000} className="nav-link save-button" onClick={this.handleShowModal} disabled={this.checkIfTagged()} >
            <i className="fas fa-save"></i>
            &nbsp; &nbsp;
            {text.home.navbar.save}
          </Button>
        </Nav>
      </Navbar>
      <Modal
        show={this.state.showModal}
        onHide={this.handleHideModal}>
        <Modal.Header>
          <Modal.Title>
            <i className="fas fa-save"></i>
            &nbsp;
            Save Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You can change the name of your project below or just click on Save to finish the process{'\u00A0'}
          <InputGroup className="mb-3 input-project-name">
            <FormControl
              placeholder={this.state.customProjectName}
              aria-label={this.state.customProjectName}
              className="custom-form-control"
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button variant="outline-success" className="btn" onClick={this.handleSaveProject}>Save</Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Body>
      </Modal>
      <Modal
        show={this.state.showSuccessModal}
        onHide={this.handleHideSuccessModal}>
        <Modal.Header>
          <Modal.Title>
            <i className="fas fa-check"></i>
            &nbsp;
            Saved successfully
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your project has been successfully saved. Next time, you can open the project using the dedicated button on the home page.
        </Modal.Body>
      </Modal>
      <Modal
        show={this.state.showErrorModal}
        onHide={this.handleHideErrorModal}>
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

  /**
   * function called to set current project name after changing it through saving modal
   */
  handleChange = event => {
    this.setState({ customProjectName: event.target.value });
  }

  /**
   * function to determine if save button has to be disabled or not
   * @returns true if there are singleTokens in props
   */
  checkIfTagged = () => {
    return this.props.singleTokens.length === 0;
  }

  /**
   * function checking the length of the name of the project
   * and reduce it if it's too long
   * @returns project name displayed format
   */
  handleDisplayProjectName = (projectName) => {
    if (projectName.length >= 15) {
      return projectName.substring(0, 14).concat("...");
    } else {
      return projectName;
    }
  }

  /**
   * function called to hide the successfully save modal
   */
  handleHideSuccessModal = () => {
    this.setState({ showSuccessModal: false });
  };

  /**
   * function called to show the successfully save modal
   */
  handleShowSuccessModal = () => {
    this.setState({ showSuccessModal: true });
  };

  /**
   * function called to hide the saving modal
   */
  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  /**
   * function called to show the saving modal
   */
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  /**
   * function called to hide the error while saving modal
   */
  handleHideErrorModal = () => {
    this.setState({ showErrorModal: false });
  };

  /**
   * function called to show the error while saving modal
   */
  handleShowErrorModal = () => {
    this.setState({ showErrorModal: true });
  };

  /**
   * function called to save the project currently opened
   * It creates a project object and store all the current props in it
   * and then save this object into the database.
   * Then it displays either the success or the error modal
   */
  handleSaveProject = () => {
    try {
      window.db = new PouchDB("testdatabase");
      let jsonToStore;
      const dragAndDrops = [...this.props.dragAndDrops];
      const singleTokens = this.props.singleTokens;
      const multi = this.props.multiTokens;
      const tokensNumber = this.props.tokensNumber;
      const headers = [...this.props.headers.headers];
      const oldProjectName = this.state.projectName;
      window.db = new PouchDB("testdatabase");
      const projectId = this.state.customProjectName;
      const dashboard = this.props.dashboard;
      console.log(this.props.dashboard);
      console.log(this.props.dashboardSettings);
      const dashboardSettings = this.props.dashboardSettings;
      if (dragAndDrops[0].file.path) {
        Papa.parse(dragAndDrops[0].file, {
          complete: function (results) {
            jsonToStore = results;
            window.db.get(projectId).then(function (doc) {
              doc.dragAndDrops = dragAndDrops[0];
              doc.multiTokens = JSON.parse(JSON.stringify(multi));
              doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
              doc.tokensNumber = tokensNumber;
              doc.headers = headers;
              doc.details = {
                lastModification: new Date().toLocaleString(),
                originalFile: dragAndDrops[0].file.name,
                originalLocation: dragAndDrops[0].file.path
              }
              doc.dashboard = dashboard;
              doc.dashboardSettings = dashboardSettings;
              return window.db.put(doc);
            }).catch(function (error) {
              console.log(error);
              return window.db.put({
                "_id": projectId,
                inputData: jsonToStore,
                multiTokens: JSON.parse(JSON.stringify(multi)),
                singleTokens: JSON.parse(JSON.stringify(singleTokens)),
                tokensNumber: tokensNumber,
                headers: headers,
                dragAndDrops: dragAndDrops[0],
                details: {
                  lastModification: new Date().toLocaleString(),
                  originalFile: dragAndDrops[0].file.name,
                  originalLocation: dragAndDrops[0].file.path
                },
                dashboard: dashboard,
                dashboardSettings: dashboardSettings
              });
            });
          }
        });
      } else {
        window.db.get(projectId).then(function (doc) {
          doc.details = {
            lastModification: new Date().toLocaleString()
          }
          doc.dragAndDrops = dragAndDrops[0];
          doc.multiTokens = JSON.parse(JSON.stringify(multi));
          doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
          doc.tokensNumber = tokensNumber;
          doc.headers = headers;
          doc.dashboard = dashboard;
          doc.dashboardSettings = dashboardSettings;
          return window.db.put(doc);
        }).catch(function (error) {
          console.log(error);
          window.db.get(oldProjectName).then(function (doc) {
            jsonToStore = doc.inputData;
            return window.db.put({
              "_id": projectId,
              inputData: jsonToStore,
              multiTokens: JSON.parse(JSON.stringify(multi)),
              singleTokens: JSON.parse(JSON.stringify(singleTokens)),
              tokensNumber: tokensNumber,
              headers: headers,
              dragAndDrops: dragAndDrops[0],
              details: {
                lastModification: new Date().toLocaleString(),
                originalFile: doc.details.originalFile,
                originalLocation: doc.details.originalLocation
              },
              dashboard: dashboard,
              dashboardSettings: dashboardSettings
            });
          });
        });
      }
      if (this.state.customProjectName !== this.state.projectName) {
        dragAndDrops[0].projectName = this.state.customProjectName;
      }
      this.handleHideModal();
      this.handleShowSuccessModal();
    } catch (error) {
      this.handleHideModal();
      this.handleShowErrorModal();
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
  state => state.dashboard,
  state => state.dashboardSettings,
  (dragAndDrops, ex, singleTokens, tokensNumber, multiTokens, headers, dashboard, dashboardSettings
  ) => ({
    dragAndDrops,
    headers,
    ex,
    singleTokens,
    tokensNumber,
    multiTokens,
    dashboard,
    dashboardSettings
  })
);
const mapActionsToProps = {
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(NavBar);
