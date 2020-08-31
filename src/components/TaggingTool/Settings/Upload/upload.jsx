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

/**
 * Component for upload page.
 * 
 * @component
 */
class Upload extends Component {

  /**
   * A react lifecycle method called when the component did mount.
   * It initialize the dragAndDrops props   */
  componentDidMount() {
    window.ipcRenderer.on("asynchronous-reply", (event, arg) => {
      console.log(arg);
    });
    window.ipcRenderer.send("asynchronous-message", "ping");

    if (!this.props.dragAndDrops.length) {
      this.props.onInitFileBox();
    }
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.upload.header,
      alertMessage: text.taggingTool.alerts.upload.message
    };
    this.props.onUpdateAlert(alert);
    if (!Object.keys(this.props.classification.types).length) {
      this.props.onClassificationRequest();
    }
  }

  /**
   * The render function.
   */
  render() {
    return (
      <div>
        {this.props.alert.showAlert && (
          <Alert
            alertHeader={this.props.alert.alertHeader}
            alertMessage={this.props.alert.alertMessage}
            styleColor="alert alert-danger"
            onDelete={this.handleDelete}
          />
        )}
        <div className="drag-drop-container">
          {this.props.dragAndDrops.map(dragAndDrop => (
            <DragAndDrop
              key={dragAndDrop.id}
              dragAndDrop={dragAndDrop}
              onContinue={this.handleContinue}
              handleFiles={this.handleFiles}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragLeave}
              onDrop={this.handleDrop}
              onChange={this.handleChange}
            />
          ))}
        </div>
      </div>
    );
  }

  /**
   * function that handle the upload of a new file
   * @param {file[]} files an array of file type uploaded
   * @function
   */
  handleFiles = files => {
    this.props.onUploadFile(
      files.base64.substring(files.base64.indexOf("base64,") + 7)
    );
    const dragAndDrops = [...this.props.dragAndDrops];
    dragAndDrops[0].file = files.fileList[0];
    dragAndDrops[0].projectName = files.fileList[0].name;
    const headers = this.props.headers;
    headers.headers = [];
    this.props.onUpdateFileBox(dragAndDrops);
  };

  /**
   * function that handle adding a file, updating the props
   * @param {dragAndDrop} dragAndDrop 
   * @param {event} e event triggered when adding a file
   * @function
   */
  handleAddFile = (dragAndDrop, e) => {
    const dragAndDrops = [...this.props.dragAndDrops];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[index] = { ...dragAndDrop };
    dragAndDrops[index].file = e.target.files[0];
    dragAndDrops[index].projectName = e.dataTransfer.files[0].name;
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleDragOver = (dragAndDrop, e) => {
    e.preventDefault();
    const dragAndDrops = [...this.props.dragAndDrops];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[index] = { ...dragAndDrop };
    dragAndDrops[index].dragged = true;
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleDragLeave = (dragAndDrop, e) => {
    e.preventDefault();
    const dragAndDrops = [...this.props.dragAndDrops];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[index] = { ...dragAndDrop };
    dragAndDrops[index].dragged = false;
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleDrop = (dragAndDrop, e) => {
    e.preventDefault();
    const dragAndDrops = [...this.props.dragAndDrops];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[index] = { ...dragAndDrop };
    dragAndDrops[index].dragged = false;
    dragAndDrops[index].dropped = true;
    dragAndDrops[index].file = e.dataTransfer.files[0];
    dragAndDrops[index].projectName = e.dataTransfer.files[0].name;
    if (this.props.alert.showAlert) {
      this.handleDelete();
    }
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleChange = (dragAndDrop, e) => {
    e.preventDefault();
    const dragAndDrops = [...this.props.dragAndDrops];
    const index = dragAndDrops.indexOf(dragAndDrop);
    dragAndDrops[index] = { ...dragAndDrop };
    dragAndDrops[index].dragged = false;
    dragAndDrops[index].dropped = true;
    dragAndDrops[index].file = e.target.files[0];
    dragAndDrops[index].projectName = e.dataTransfer.files[0].name;
    if (this.props.alert.showAlert) {
      this.handleDelete();
    }
    this.props.onUpdateFileBox(dragAndDrops);
  };
  handleContinue = (dragAndDrop) => {
    if (!dragAndDrop.file) {
      const alert = { ...this.props.alert };
      alert.showAlert = true;
      this.props.onUpdateAlert(alert);
    } else {
      this.props.history.push("/taggingTool/settings/headers");
    }
  };
  handleDelete = () => {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
    this.props.onUpdateAlert(alert);
  };
}

const mapStateToProps = createSelector(
  state => state.dragAndDrops,
  state => state.alert,
  state => state.classification,
  state => state.headers,
  (dragAndDrops, alert, classification, headers) => ({
    dragAndDrops,
    alert,
    classification,
    headers
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
