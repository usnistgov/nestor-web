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
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
class NavBar extends Component
{
  state = { projectName: '', showModal: false, hasStartedTagging: false, showSuccessModal:false, customProjectName: "" };

  constructor(props){
    super(props);
    this.handleSaveProject = this.handleSaveProject.bind(this);
  }
  componentDidUpdate(prevProps)
  {
    if(this.props.dragAndDrops[0].projectName !== prevProps.dragAndDrops[0].projectName 
      || this.props.dragAndDrops[0].projectName !== this.state.projectName){
      this.setState({projectName: this.props.dragAndDrops[0].projectName, customProjectName:this.props.dragAndDrops[0].projectName});
    }else if(this.props.dragAndDrops[0].projectName === "" && this.props.dragAndDrops[0].projectName !== 
    prevProps.dragAndDrops[0].projectName){
      this.setState({projectName:""});
    }
    if(this.props.singleTokens.length !== prevProps.singleTokens.length && this.props.singleTokens.length>0){
      this.setState({hasStartedTagging: true});
    }else if(this.props.singleTokens.length !== prevProps.singleTokens.length && this.props.singleTokens.length === 0) {
      this.setState({hasStartedTagging: false});
    }
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    if(this.props.dragAndDrops[0] && nextProps.dragAndDrops[0]){
      return this.state.projectName !== nextProps.dragAndDrops[0].projectName 
      || this.props.singleTokens.length !== nextProps.singleTokens.length
      || nextState.showModal !== this.state.showModal
      || nextState.showSuccessModal !== this.state.showSuccessModal;
    }else{
      return false;
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
          <Button key={ 1000 } className="nav-link save-button" onClick={ this.handleShowModal } disabled={ this.checkIfTagged() } >
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
        show={ this.state.showSuccessModal }
        onHide={ this.handleHideSuccessModal }>
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

  handleChange = event => {
    this.setState({customProjectName: event.target.value });
  }

  checkIfTagged = () =>
  {
    return  this.props.singleTokens.length === 0;
  }

  handleDisplayProjectName = (projectName) =>
  {
    if (projectName.length >= 15)
    {
      return projectName.substring(0, 14).concat("...");
    } else
    {
      return projectName;
    }
  }

  handleHideSuccessModal = () =>
  {
    this.setState({ showSuccessModal: false });
  };
  handleShowSuccessModal = () =>
  {
    this.setState({ showSuccessModal: true });
  };
  handleHideModal = () =>
  {
    this.setState({ showModal: false});
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
      window.db = new PouchDB("testdatabase");
      let jsonToStore;
      const dragAndDrops = [ ...this.props.dragAndDrops ];
      const singleTokens = this.props.singleTokens;
      const multi = this.props.multiTokens;
      const tokensNumber = this.props.tokensNumber;
      const headers = [ ...this.props.headers.headers ];
      const oldProjectName = this.state.projectName;
      window.db = new PouchDB("testdatabase");
      const projectId = this.state.customProjectName;
      if (dragAndDrops[ 0 ].file.path)
      {
        Papa.parse(dragAndDrops[ 0 ].file, {
          complete: function (results)
          {
            jsonToStore = results;
            window.db.get(projectId).then(function (doc)
            {
              doc.dragAndDrops = dragAndDrops[ 0 ];
              doc.multiTokens = JSON.parse(JSON.stringify(multi));
              doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
              doc.tokensNumber = tokensNumber;
              doc.headers = headers;
              doc.details = {
                 lastModification: new Date().toLocaleString(),
                 originalFile: dragAndDrops[0].file.name,
                 originalLocation: dragAndDrops[0].file.path
               }
              return window.db.put(doc);
            }).catch(function (error)
            {
              console.log(error);
              return window.db.put({
                "_id": projectId,
                inputData: jsonToStore,
                multiTokens: JSON.parse(JSON.stringify(multi)),
                singleTokens: JSON.parse(JSON.stringify(singleTokens)),
                tokensNumber: tokensNumber,
                headers: headers,
                dragAndDrops: dragAndDrops[ 0 ],
                details: {
                  lastModification: new Date().toLocaleString(),
                  originalFile: dragAndDrops[0].file.name,
                  originalLocation: dragAndDrops[0].file.path
                }
              });
            });
          }
        });
      } else
      {
        window.db.get(projectId).then(function (doc)
        {
          doc.details = {
            lastModification: new Date().toLocaleString()
          }
          doc.dragAndDrops = dragAndDrops[ 0 ];
          doc.multiTokens = JSON.parse(JSON.stringify(multi));
          doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
          doc.tokensNumber = tokensNumber;
          doc.headers = headers;
          return window.db.put(doc);
        }).catch(function (error)
        {
          console.log(error);
          window.db.get(oldProjectName).then(function (doc){
            jsonToStore = doc.inputData;
            return window.db.put({
              "_id": projectId,
              inputData: jsonToStore,
              multiTokens: JSON.parse(JSON.stringify(multi)),
              singleTokens: JSON.parse(JSON.stringify(singleTokens)),
              tokensNumber: tokensNumber,
              headers: headers,
              dragAndDrops: dragAndDrops[ 0 ],
              details: {
                lastModification: new Date().toLocaleString(),
                originalFile: doc.details.originalFile,
                originalLocation: doc.details.originalLocation
              }
          });
          });
        });
      }
      if(this.state.customProjectName !== this.state.projectName){
        dragAndDrops[0].projectName = this.state.customProjectName;
      }
      this.handleHideModal();
      this.handleShowSuccessModal();
    } catch (error)
    {
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
