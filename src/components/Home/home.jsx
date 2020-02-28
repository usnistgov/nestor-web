import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import text from "../../assets/language/en.js";
import PouchDB from "pouchdb";
import Papa from "papaparse";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { openProject } from "../Home/homeAction";
import { initFileBox } from "../TaggingTool/Settings/Upload/uploadAction";
import { updateSingleTokens, updateVocab } from "../TaggingTool/Tag/Single/singleTokensAction";
import { updateMultiTokens } from "../TaggingTool/Tag/Multi/multiTokensAction";
import { updateHeaders } from "../TaggingTool/Settings/Headers/headersAction";
import { headersRequest } from "../TaggingTool/Settings/Headers/headersAction";
import { initReport } from "../TaggingTool/Report/reportAction";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"

class Home extends Component
{
  state = {
    showModal: false,
    listOfProjects: []
  };

  componentDidMount()
  {
    window.db = new PouchDB("testdatabase");
    let tmpListOfProjects = [];
    window.db.allDocs().then((result) =>
    {
      result.rows.forEach(element =>
      {
        tmpListOfProjects.push(element.id);
      });
      this.setState({ listOfProjects: tmpListOfProjects });
    });
  }



  render()
  {
    return (
      <div className="home-container">
        <div className="title">{ text.home.header }</div>
        <div className="button text-center">
          <button className="btn-dark">
            <NavLink to="/taggingTool/settings/upload">{ text.home.button }</NavLink>
          </button>
          <br />
          <br />
          <button className="btn-light"
            onClick={ this.handleShowModal }
            label="Open Project">
            Manage Projects
          </button>

        </div>
        <Modal
          show={ this.state.showModal }
          onHide={ this.handleHideModal }>
          <Modal.Header>
            <Modal.Title><i className="far fa-folder-open"></i>&nbsp;&nbsp;List of projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.listOfProjects.length !== 0 ? <div>
              You can either select a project to open it or delete it by selecting the trash button.
            <hr />
              <Accordion defaultActiveKey="0">
                { this.state.listOfProjects.map((obj, i) =>
                  (
                    <Card bg="light" className="project-card" key={ i }>
                      <Accordion.Toggle as={ Card.Header } eventKey={ i }>
                        { obj }
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={ i }>
                        <Card.Body className="flexbox">
                          <Button variant="outline-primary" onClick={ () => this.handleOpenProject(obj) }> Open&nbsp;&nbsp;<i className="far fa-arrow-alt-circle-right"></i></Button>
                          <Button variant="outline-danger right" onClick={ () => this.handleDeleteProject(obj) }> Delete&nbsp;&nbsp;<i className="far fa-trash-alt"></i></Button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )) }
              </Accordion></div>
              : <div>
                There is no project yet in your local database. You should first upload a csv file and then you can save projects to use this menu and open them.
              </div>
            }
          </Modal.Body>
        </Modal>
      </div >);
  }
  handleHideModal = () =>
  {
    this.setState({ showModal: false });
  };
  handleShowModal = () =>
  {
    this.setState({ showModal: true });
  };

  handleDeleteProject(projectName)
  {
    window.db.get(projectName).then(function (doc)
    {
      return window.db.remove(doc);
    }).catch((error) =>
    {
      console.log("an error occured : ".concat(error));
    }).then(() =>
    {

      window.db = new PouchDB("testdatabase");
      let tmpListOfProjects = [];
      window.db.allDocs().then((result) =>
      {
        result.rows.forEach(element =>
        {
          tmpListOfProjects.push(element.id);
        });
        this.setState({ listOfProjects: tmpListOfProjects });
      });
      window.location.reload(false);
    });
  }


  handleOpenProject(projectName)
  {
    this.handleHideModal();
    let currentProject;
    window.db.get(projectName)
      .then(result =>
      {
        currentProject = result;
        if (!this.props.dragAndDrops.length)
        {
          this.props.onInitFileBox();
        }
        const dragAndDrops = [ ...this.props.dragAndDrops ];
        dragAndDrops[ 0 ].file.name = currentProject.project_id;
        const headers = this.props.headers;
        headers.headers = currentProject.headers;
        const tokensNumber = this.props.tokensNumber;
        tokensNumber.value = parseInt(currentProject.tokensNumber.value);
        tokensNumber.maxValue = currentProject.tokensNumber.maxValue;
        let selectedHeadersLabels = [];
        headers.headers.filter((header) =>
        {
          if (header.checked)
          {
            return selectedHeadersLabels.push(header.label);
          }
          return 0;
        })
        this.props.onOpenProject(Papa.unparse(currentProject.inputData.data), selectedHeadersLabels);

        if (currentProject.singleTokens)
        {
          this.props.onUpdateSingleTokens(JSON.parse(JSON.stringify(currentProject.singleTokens)));
          currentProject.singleTokens.forEach(token =>
          {
            if (token.classification.label !== "")
            {
              this.props.onUpdateVocab(token);
            }
          });
        }
        if (currentProject.multiTokens)
        {
          this.props.onUpdateMultiTokens(JSON.parse(JSON.stringify(currentProject.multiTokens)));
          currentProject.multiTokens.forEach(token =>
          {
            if (token.classification.label !== "")
            {
              this.props.onUpdateVocab(token);
            }
          });
        }
        this.props.history.push("/taggingTool/settings/overview");
      });
  }
}
const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.headers,
  state => state.tokensNumber,
  state => state.projectName,
  (dragAndDrops, headers, tokensNumber, projectName) => ({
    dragAndDrops,
    headers,
    tokensNumber,
    projectName
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
  onUpdateVocab: updateVocab
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);