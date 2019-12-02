import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./dragAndDrop.css";
import "../../TaggingRouter/setting.css";
import ReactFileReader from "react-file-reader";
import text from "../../../../assets/language/en.js";

class DragAndDrop extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="col">
        <div className="drag-drop-title">
          {text.taggingTool.settings.upload.startBox.title}
        </div>
        <div
          className="drag-drop-box "
          /* onDragOver={e => this.props.onDragOver(this.props.dragAndDrop, e)}
          onDragLeave={e => this.props.onDragLeave(this.props.dragAndDrop, e)}
          onDrop={e => this.props.onDrop(this.props.dragAndDrop, e)} */
        >
          <i className="fas fa-file-csv" />
          <br />

          <ReactFileReader
            fileTypes={[".csv"]}
            base64={true}
            handleFiles={this.props.handleFiles}
          >
            <button type="button" className="btn btn-success">
              <span>
                {text.taggingTool.settings.upload.startBox.selectLabel}
              </span>
            </button>
          </ReactFileReader>
          <p className="fileName">{this.setDropBoxFileLabel()}</p>
          {/* <label className="fileContainer">
          </label> 
           <input
              type="file"
              onChange={e => this.props.onChange(this.props.dragAndDrop, e)}
            />
          </label>
          <p>Or drag and drop it here</p>
          <p className="fileName">{this.setDropBoxFileLabel()}</p> */}
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

  setDropBoxColor() {
    let classe = "drag-drop-box ";
    classe += this.props.dragAndDrop.dragged ? "draggedOver" : "";
    return classe;
  }
  setDropBoxFileLabel() {
    let label = this.props.dragAndDrop.file
      ? this.props.dragAndDrop.file.name
      : "No file";
    return label;
  }
}
export default DragAndDrop;
