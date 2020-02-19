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

class Home extends Component
{

  constructor(props)
  {
    super(props);
  }


  state = {
    showModal: false,
    listOfProjects: []
  };

  componentDidMount()
  {
    window.db = new PouchDB("testdatabase");
    window.db.info().then(function (info)
    {
      console.log(info);
    });
    let tmpListOfProjects = [];
    window.db.allDocs().then((result) =>
    {
      console.log(result);
      result.rows.forEach(element =>
      {
        console.log(element);
        tmpListOfProjects.push(element.id);
      });
      console.log(tmpListOfProjects);
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
    console.log(projectName)

    window.db.get(projectName)
      .then(result =>
      {
        currentProject = result;
        var csvDataFromDatabase = Papa.unparse(currentProject.inputData.data);
        console.log(csvDataFromDatabase);
        this.props.onOpenProject(Papa.unparse(currentProject.inputData.data));

      });
    console.log(this.props);
    // pass data to api to restaure session
    // this.props.onUpdateFileBox(projectName);
    // set input data as csv uploaded
    // set headers selected

  }
}
const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  (dragAndDrops) => ({
    dragAndDrops
  })
);
const mapActionsToProps = {
  onOpenProject: openProject
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);