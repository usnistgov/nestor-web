import React, { Component } from "react";
import "./tag.css";
import text from "../../../../assets/language/en.js";

class Note extends Component {
  render() {
    return (
      <div className="note">
        <div className="note-text" onClick={() => this.props.onClick()}>
          {this.getToggleText()} <i className={this.getArrowClass()} />
        </div>
        {this.props.disabled && (
          <div className="note-text">
            <i className="far fa-edit" onClick={() => this.props.onEdit()} />
          </div>
        )}
        {this.props.showNote && (
          <textarea
            name="note"
            id="note"
            rows="5"
            value={this.props.value}
            onChange={e => this.props.onChangeNote(e)}
            disabled={this.props.disabled}
          />
        )}

        {/*</div>{this.props.showNote && (*/}
        {false && (
          <div className="note-center">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => this.props.onAdd()}
              disabled={this.props.disabled}
            >
              {text.taggingTool.tagging.singleToken.addButton}
            </button>
          </div>
        )}
      </div>
    );
  }
  getArrowClass() {
    let classes = "fas fa-arrow-circle-";
    classes += this.props.showNote ? "up" : "down";
    return classes;
  }
  getToggleText() {
    let classes = "";
    classes += this.props.showNote
      ? text.taggingTool.tagging.singleToken.note.hideLabel
      : text.taggingTool.tagging.singleToken.note.displayLabel;
    return classes;
  }
}

export default Note;
