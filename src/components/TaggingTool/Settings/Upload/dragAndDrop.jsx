import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./dragAndDrop.css";
import "../../TaggingRouter/setting.css";
import ReactFileReader from "react-file-reader";
import text from "../../../../assets/language/en.js";

/**
 * DragAndDrop component.
 * 
 * @component
 */
class DragAndDrop extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <div className="col">
        <div className="drag-drop-title">
          {text.taggingTool.settings.upload.startBox.title}
        </div>
        <div className="drag-drop-box ">
          <i className="fas fa-file-csv" />
          <br />
          <ReactFileReader
            fileTypes={[".csv"]}
            base64={true}
            handleFiles={this.props.handleFiles}>
            <button type="button" className="btn btn-success">
              <span>
                {text.taggingTool.settings.upload.startBox.selectLabel}
              </span>
            </button>
          </ReactFileReader>
          <p className="fileName">{this.setDropBoxFileLabel()}</p>
        </div>
        <div className="drag-drop-button">
          <Route
            render={({ history }) => (
              <button
                type="button"
                className="btn btn-dark"
                onClick={() =>
                  this.props.onContinue(this.props.dragAndDrop, history)
                }
              >
                {text.taggingTool.settings.upload.startBox.buttonLabel}
              </button>
            )}
          />
        </div>
      </div>
    );
  }

  /**
   * function that sets the class property of the dragAndDrop
   */
  setDropBoxColor() {
    let classe = "drag-drop-box ";
    classe += this.props.dragAndDrop.dragged ? "draggedOver" : "";
    return classe;
  }

  /**
   * function that sets the label property of the dragAndDrop
   */
  setDropBoxFileLabel() {
    let label = this.props.dragAndDrop.file
      ? this.props.dragAndDrop.file.name
      : "No file";
    return label;
  }
}
export default DragAndDrop;
