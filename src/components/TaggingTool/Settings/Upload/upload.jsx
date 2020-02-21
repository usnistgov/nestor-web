import React, { Component } from "react";
import DragAndDrop from "./dragAndDrop";
import "./upload.css";
import Alert from "../../../CommonComponents/Alert/alert";
import text from "../../../../assets/language/en.js";
import { connect } from "react-redux";
import { updateFileBox, initFileBox, uploadFile } from "./uploadAction";
import { classificationRequest } from "../Classification/classificationAction";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import { updateHeaders } from "../Headers/headersAction";
import { createSelector } from "reselect";
import Papa from "papaparse";
import PouchDB from "pouchdb";

class Upload extends Component
{

  componentDidMount()
  {
    window.ipcRenderer.on("asynchronous-reply", (event, arg) =>
    {
      console.log(arg);
    });
    window.ipcRenderer.send("asynchronous-message", "ping");

    if (!this.props.dragAndDrops.length)
    {
      this.props.onInitFileBox();
    }
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.upload.header,
      alertMessage: text.taggingTool.alerts.upload.message
    };
    this.props.onUpdateAlert(alert);
    if (!Object.keys(this.props.classification.types).length)
    {
      this.props.onClassificationRequest();
    }
  }
  render()
  {
    return (
      <div>
        { this.props.alert.showAlert && (
          <Alert
            alertHeader={ this.props.alert.alertHeader }
            alertMessage={ this.props.alert.alertMessage }
            styleColor="alert alert-danger"
            onDelete={ this.handleDelete }
          />
        ) }
        <div className="drag-drop-container">
          { this.props.dragAndDrops.map(dragAndDrop => (
            <DragAndDrop
              key={ dragAndDrop.id }
              dragAndDrop={ dragAndDrop }
              onContinue={ this.handleContinue }
              handleFiles={ this.handleFiles }
              onDragOver={ this.handleDragOver }
              onDragLeave={ this.handleDragLeave }
              onDrop={ this.handleDrop }
              onChange={ this.handleChange }
            />
          )) }
        </div>
      </div>
    );
  }
  handleFiles = files =>
  {
    this.props.onUploadFile(
      files.base64.substring(files.base64.indexOf("base64,") + 7)
    );
    //console.log(files.base64.substring(files.base64.indexOf("base64,") + 7));
    const dragAndDrops = [ ...this.props.dragAndDrops ];
    dragAndDrops[ 0 ].file = files.fileList[ 0 ];
    this.props.onUpdateFileBox(dragAndDrops);
    this.storeInputData(dragAndDrops[ 0 ].file);
  };

  handleAddFile = (dragAndDrop, e) =>
  {
    const dragAndDrops = [ ...this.props.dragAndDrops ];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[ index ] = { ...dragAndDrop };
    dragAndDrops[ index ].file = e.target.files[ 0 ];
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleDragOver = (dragAndDrop, e) =>
  {
    e.preventDefault();
    const dragAndDrops = [ ...this.props.dragAndDrops ];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[ index ] = { ...dragAndDrop };
    dragAndDrops[ index ].dragged = true;
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleDragLeave = (dragAndDrop, e) =>
  {
    e.preventDefault();
    const dragAndDrops = [ ...this.props.dragAndDrops ];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[ index ] = { ...dragAndDrop };
    dragAndDrops[ index ].dragged = false;
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleDrop = (dragAndDrop, e) =>
  {
    e.preventDefault();
    const dragAndDrops = [ ...this.props.dragAndDrops ];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[ index ] = { ...dragAndDrop };
    dragAndDrops[ index ].dragged = false;
    dragAndDrops[ index ].dropped = true;
    dragAndDrops[ index ].file = e.dataTransfer.files[ 0 ];
    if (this.props.alert.showAlert)
    {
      this.handleDelete();
    }
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleChange = (dragAndDrop, e) =>
  {
    e.preventDefault();
    const dragAndDrops = [ ...this.props.dragAndDrops ];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[ index ] = { ...dragAndDrop };
    dragAndDrops[ index ].dragged = false;
    dragAndDrops[ index ].dropped = true;
    dragAndDrops[ index ].file = e.target.files[ 0 ];
    if (this.props.alert.showAlert)
    {
      this.handleDelete();
    }
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleContinue = (dragAndDrop, history) =>
  {
    if (!dragAndDrop.file)
    {
      const alert = { ...this.props.alert };
      alert.showAlert = true;
      this.props.onUpdateAlert(alert);
    } else
    {
      history.push("/taggingTool/settings/headers");
    }
  };
  handleDelete = () =>
  {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
    this.props.onUpdateAlert(alert);
  };
  storeInputData = (file, history) =>
  {
    window.db = new PouchDB("testdatabase");
    let jsonToStore;
    Papa.parse(file, {
      complete: function (results)
      {
        jsonToStore = results;
      }
    });
    const projectId = file.name.split(".")[ 0 ];
    window.db.get(projectId).then(function (doc)
    {
      console.log(doc);
      doc.inputData = jsonToStore;
      return window.db.put(doc);
    }).catch(function (err)
    {
      return window.db.put({
        "_id": projectId,
        project_id: file.name,
        inputData: jsonToStore,
        headers: {},
        singleToken: {},
        multiToken: {},
        vocab: {},
        singleTokens: {}
      });
    }).then(function ()
    {
      return window.db.get(projectId);
    }).then(function (doc)
    {
      console.log(doc);
    });

  }
}

const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.alert,
  state => state.classification,
  state => state.headers,
  state => state.singleTokens,
  (dragAndDrops, alert, classification, headers, singleTokens) => ({
    dragAndDrops,
    alert,
    classification,
    headers,
    singleTokens
  })
);
const mapActionsToProps = {
  onUpdateFileBox: updateFileBox,
  onInitFileBox: initFileBox,
  onUploadFile: uploadFile,
  onUpdateAlert: updateAlert,
  onClassificationRequest: classificationRequest,
  onUpdateHeaders: updateHeaders
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Upload);
