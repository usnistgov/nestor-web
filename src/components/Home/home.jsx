import React, { Component } from "react";
import "./home.css";
import text from "../../assets/language/en.js";
import PouchDB from "pouchdb";
import Papa from "papaparse";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { openProject, clearAllAttributes } from "../Home/homeAction";
import { initFileBox } from "../TaggingTool/Settings/Upload/uploadAction";
import { updateSingleTokens, updateVocab, setTokens } from "../TaggingTool/Tag/Single/singleTokensAction";
import { updateMultiTokens } from "../TaggingTool/Tag/Multi/multiTokensAction";
import { updateHeaders } from "../TaggingTool/Settings/Headers/headersAction";
import { headersRequest } from "../TaggingTool/Settings/Headers/headersAction";
import { initReport } from "../TaggingTool/Report/reportAction";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import { updateDashboardHeaders, displayDashboardHeaders } from "../Dashboard/Settings/dashboardHeaders/dashboardHeadersAction";

/**
 * Component for home page.
 * 
 * @component
 */
class HomeComponent extends Component {

  /** 
   * @constructor
  */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      listOfProjects: [],
      projectOpened: '',
      lastRow: null
    };
  }

  /**
   * A react lifecycle method called when the component did mount.
   * It loads the list of projects from the database
   */
  componentDidMount() {
    window.db = new PouchDB("testdatabase");
    let tmpListOfProjects = [];
    window.db.allDocs().then((result) => {
      result.rows.forEach(element => {
        window.db.get(element.id).then((project) => {
          tmpListOfProjects.push({
            name: project._id,
            lastModification: project.details.lastModification,
            originalFile: project.details.originalFile,
            originalLocation: project.details.originalLocation
          });
        });
      });
      this.setState({ listOfProjects: tmpListOfProjects });
    });
  }

  /**
   * The render function.
   */
  render() {
    return (
      <div className="home-container">
        <div className="title">{text.home.header}</div>
        <div className="button text-center">
          <button className="btn-dark" onClick={this.newProject}>
            {text.home.button.newProject}
          </button>
          <br />
          <br />
          <button className="btn-light"
            onClick={this.handleShowModal}
            label="Open Project">
            {text.home.button.openProject}
          </button>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={this.handleHideModal}>
          <Modal.Header>
            <Modal.Title><i className="far fa-folder-open"></i>&nbsp;&nbsp;List of projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.listOfProjects.length !== 0 ? <div>
              You can either select a project to open it or delete it by selecting the trash button.
            <hr />
              <Accordion defaultActiveKey="0">
                {this.state.listOfProjects.map((obj, i) =>
                  (
                    <Card bg="light" className="project-card" key={i+1}>
                      <Accordion.Toggle as={Card.Header} eventKey={i+1}>
                        {obj.name}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={i+1}>
                        <Card.Body>
                          <Card.Subtitle className="mb-2 text-muted">Details</Card.Subtitle>
                          <strong>Last opened</strong> : {obj.lastModification}<br />
                          <strong>Original input file</strong> : {obj.originalFile}<br />
                          <strong>Location</strong> : {obj.originalLocation}
                          <hr />
                          <div className="flexbox">
                            <Button variant="outline-primary" onClick={() => this.handleOpenProject(obj.name)}> Open&nbsp;&nbsp;<i className="far fa-arrow-alt-circle-right"></i></Button>
                            <Button variant="outline-danger right" onClick={() => this.handleDeleteProject(obj.name)}> Delete&nbsp;&nbsp;<i className="far fa-trash-alt"></i></Button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))}
              </Accordion></div>
              : <div>
                There is no project yet in your local database. You should first upload a csv file and then you can save projects to use this menu and open them.
              </div>
            }
          </Modal.Body>
        </Modal>
      </div >);
  }

  /**
   * function called to hide the projects list modal
   */
  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  /**
   * function called to show the projects list modal
   */
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  /**
   * function called to delete a project
   * It deletes the project from the database
   * and clears the state of the python script if
   * the deleted project was currently opened
   * @param {string} projectName project name to be deleted
   */
  handleDeleteProject(projectName) {
    window.db.get(projectName).then(function (doc) {
      return window.db.remove(doc);
    }).catch((error) => {
      console.log("an error occured : ".concat(error));
    }).then(() => {
      if (this.state.projectOpened === projectName) {
        this.clearApplicationState();
      }
      const newListOfProjects = this.state.listOfProjects.filter(project => {
        return project.name !== projectName;
      });
      this.setState({ listOfProjects: newListOfProjects });
    });
  }

  /**
   * function called to clear the state of the application
   * Basically, it resets all the props to null, among dragAndDrops,
   * singleTokens, multiTokens, headers, tokensNumber, and call the 
   * function clearAllattribute from the python script which reset the
   * global variables to empty in the script.
   */
  clearApplicationState = () => {
    this.props.onInitFileBox();
    this.props.onSetTokens([]);
    this.props.onClearAllAttributes();
    if (this.props.dragAndDrops[0] && this.props.dragAndDrops[0].file) {
      const headers = this.props.headers;
      headers.headers = [];
      const dragAndDrops = [...this.props.dragAndDrops];
      dragAndDrops[0].file = new File([], '');
      dragAndDrops[0].projectName = '';
      const tokensNumber = this.props.tokensNumber;
      tokensNumber.value = parseInt("0");
      tokensNumber.maxValue = 0;
      const dashboard = this.props.dashboard;
      dashboard.assetSelected = {
        label: "",
        problemsRelated: "",
        mostFoundProblems: [],
        mostFoundSolutions: [],
        mostFoundItems: []
      };
      dashboard.assetsStats = [];
      this.props.onDisplayDashboardHeaders([]);
    }
  }

  /**
   * function called to open a project from the list
   * It hides the modal, and then load the project from the database
   * and set all the props to the values retrieved from the database.
   * It also redirect to the overview page
   * @param {string} projectName project name to be opened
   */
  handleOpenProject(projectName) {
    this.handleHideModal();
    let currentProject;
    window.db.get(projectName)
      .then(result => {
        currentProject = result;
        if (!this.props.dragAndDrops.length) {
          this.props.onInitFileBox();
        }
        const dragAndDrops = [...this.props.dragAndDrops];
        dragAndDrops[0].file = new File([], currentProject._id);
        dragAndDrops[0].projectName = currentProject._id;
        const headers = this.props.headers;
        headers.headers = currentProject.headers;
        const tokensNumber = this.props.tokensNumber;
        tokensNumber.value = parseInt(currentProject.tokensNumber.value);
        tokensNumber.maxValue = currentProject.tokensNumber.maxValue;
        let selectedHeadersLabels = [];
        const dashboard = this.props.dashboard;
        dashboard.assetsStats = currentProject.dashboard.assetsStats;
        dashboard.assetSelected = currentProject.dashboard.assetSelected;
        this.prepareSettingsToUpdate(currentProject.dashboardSettings);
        this.props.onDisplayDashboardHeaders(currentProject.dashboardSettings);
        headers.headers.filter((header) => {
          if (header.checked) {
            return selectedHeadersLabels.push(header.label);
          }
          return 0;
        })
        this.props.onOpenProject(Papa.unparse(currentProject.inputData.data), selectedHeadersLabels);
        if (currentProject.singleTokens) {
          this.props.onUpdateSingleTokens(JSON.parse(JSON.stringify(currentProject.singleTokens)));
          currentProject.singleTokens.forEach(token => {
            if (token.classification.label !== "") {
              this.props.onUpdateVocab(token);
            }
          });
        }
        if (currentProject.multiTokens) {
          this.props.onUpdateMultiTokens(JSON.parse(JSON.stringify(currentProject.multiTokens)));
          currentProject.multiTokens.forEach(token => {
            if (token.classification.label !== "") {
              this.props.onUpdateVocab(token);
            }
          });
        }
        this.props.history.push("/taggingTool/settings/overview");
      });
  }

  prepareSettingsToUpdate(dashboardSettings) {
    let res = {
      NA: [],
      machineName: [],
      technicianName: []
    }
    dashboardSettings.forEach(rowSetting => {
      rowSetting.checkboxes.filter((checkbox) => {
        if (checkbox.checked) {
          switch (checkbox.label) {
            case "technicianName":
              res.technicianName.push(rowSetting.rowLabel);
              break;
            case "machineName":
              res.machineName.push(rowSetting.rowLabel);
              break;
            case "NA":
              res.NA.push(rowSetting.rowLabel);
              break;
            default:
              break;
          }
        }
        return true;
      });
    });
    this.props.onUpdateDashboardHeaders(res);
  }

  /**
   * function called to create a new project
   * clear the application state and redirect to upload page
   */
  newProject = () => {
    this.clearApplicationState();
    this.props.history.push("/taggingTool/settings/upload");

  }
}
const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.headers,
  state => state.tokensNumber,
  state => state.projectName,
  state => state.singleTokens,
  state => state.dashboard,
  state => state.dashboardSettings,
  (dragAndDrops, headers, tokensNumber, projectName, singleTokens, dashboard, dashboardSettings) => ({
    dragAndDrops,
    headers,
    tokensNumber,
    projectName,
    singleTokens,
    dashboard,
    dashboardSettings
  })
);
const mapActionsToProps = {
  onOpenProject: openProject,
  onInitFileBox: initFileBox,
  onUpdateSingleTokens: updateSingleTokens,
  onUpdateMultiTokens: updateMultiTokens,
  onUpdateHeaders: updateHeaders,
  onHeadersRequest: headersRequest,
  onInitReport: initReport,
  onUpdateVocab: updateVocab,
  onClearAllAttributes: clearAllAttributes,
  onSetTokens: setTokens,
  onDisplayDashboardHeaders: displayDashboardHeaders,
  onUpdateDashboardHeaders: updateDashboardHeaders
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomeComponent);