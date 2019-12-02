import React, { Component } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import text from "../../../../assets/language/en.js";
import TagButton from "./tagButton";

class List extends Component {
  state = {
    input: "",
    list: this.props.list
  };
  render() {
    return (
      <Modal size="xl" show={this.props.showModal} onHide={this.props.onDelete}>
        {/*<Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">{text.taggingTool.tagging.singleToken.modal.title}</Modal.Title>
            </Modal.Header> */}
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              value={this.state.input}
              onChange={e => this.handleChange(e)}
              placeholder={
                text.taggingTool.tagging.singleToken.modal.placeholder
              }
              aria-label={
                text.taggingTool.tagging.singleToken.modal.placeholderAria
              }
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">
                <i className="fas fa-search" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="list-body">
            {this.state.list.map((obj, i) => (
              <div key={i} className="list-item">
                <TagButton
                  value={obj.label}
                  shortkey={""}
                  showTooltipIcon={false}
                  tooltip={""}
                  color={"#00a6ff"}
                  onClick={() => this.props.onClick(obj)}
                />
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onDelete}>
            {text.taggingTool.tagging.singleToken.modal.buttonLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  handleChange = event => {
    var input = this.state.input;
    input = event.target.value;
    this.setState({ input });
    var tokens = [...this.props.list];
    const list = tokens.filter(element => element.label.indexOf(input) !== -1);
    this.setState({ list });
  };
}

export default List;
