import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import text from "../../assets/language/en.js";
import Button from "../CommonComponents/Button/button";
import PouchDB from "pouchdb";
import Papa from "papaparse";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { openProject } from "../Home/homeAction";
import { initFileBox } from "../TaggingTool/Settings/Upload/uploadAction"
import { updateSingleTokens, singleTokensRequest, updateVocab } from "../TaggingTool/Tag/Single/singleTokensAction";
import { updateHeaders } from "../TaggingTool/Settings/Headers/headersAction";
import { headersRequest } from "../TaggingTool/Settings/Headers/headersAction"
import { initReport } from "../TaggingTool/Report/reportAction"


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
          <button className="btn-dark"
            onClick={ this.handleShowModal }
            label="Open Project">
            Open Project
          </button>

        </div>
        <Modal
          show={ this.state.showModal }
          onHide={ this.handleHideModal }>
          <Modal.Header closeButton>
            <Modal.Title>Select the project you want to open in the list below</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              { this.state.listOfProjects.map((obj, i) =>
                (
                  <ListGroup.Item key={ i }
                    onClick={ () => this.handleOpenProject(obj) }>{ obj }</ListGroup.Item>
                )) }
            </ListGroup>
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
            selectedHeadersLabels.push(header.label);
          }
        })
        this.props.onOpenProject(Papa.unparse(currentProject.inputData.data), selectedHeadersLabels);


        this.props.onUpdateSingleTokens(JSON.parse(JSON.stringify(currentProject.singleTokens)));
        currentProject.singleTokens.forEach(token =>
        {
          if (token.classification.label !== "")
          {
            this.props.onUpdateVocab(token);
          }
        });
        this.props.history.push("/taggingTool/settings/overview");
      });
  }
}
const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.headers,
  state => state.singleTokens,
  state => state.tokensNumber,
  (dragAndDrops, headers, singleTokens, tokensNumber) => ({
    dragAndDrops,
    headers,
    singleTokens,
    tokensNumber
  })
);
const mapActionsToProps = {
  onOpenProject: openProject,
  onInitFileBox: initFileBox,
  onUpdateSingleTokens: updateSingleTokens,
  onUpdateHeaders: updateHeaders,
  onHeadersRequest: headersRequest,
  onInitReport: initReport,
  onSingleTokensRequest: singleTokensRequest,
  onUpdateVocab: updateVocab
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);