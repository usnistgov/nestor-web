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
import { updateSingleTokens } from "../TaggingTool/Tag/Single/singleTokensAction";


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
          <Button
            onClick={ this.handleShowModal }
            class="btn btn-primary ctn"
            label="Open Project">
          </Button>
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
        this.props.onOpenProject(Papa.unparse(currentProject.inputData.data));
        if (!this.props.dragAndDrops.length)
        {
          this.props.onInitFileBox();
        }
        const dragAndDrops = [ ...this.props.dragAndDrops ];
        dragAndDrops[ 0 ].file.name = currentProject.project_id;
        const headers = this.props.headers;
        headers.headers = currentProject.headers;
        this.props.onUpdateSingleTokens(currentProject.singleTokens);
        console.log(this.props);
      });
    console.log(this.props);
  }
}
const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.headers,
  state => state.singleTokens,
  (dragAndDrops, headers, singleTokens) => ({
    dragAndDrops,
    headers,
    singleTokens
  })
);
const mapActionsToProps = {
  onOpenProject: openProject,
  onInitFileBox: initFileBox,
  onUpdateSingleTokens: updateSingleTokens
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);