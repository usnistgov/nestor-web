import React, { Component } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import text from "../../../../assets/language/en.js";
import TagButton from "./tagButton";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


class List extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      input: "",
      list: this.props.list,
      alpahbeticFilter: false
    };
    this.handleAlphabeticFilter.bind(this);
  }



  render()
  {
    return (
      <Modal size="xl" show={ this.props.showModal } onHide={ this.props.onDelete }>
        {/*<Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">{text.taggingTool.tagging.singleToken.modal.title}</Modal.Title>
            </Modal.Header> */}
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              value={ this.state.input }
              onChange={ e => this.handleChange(e) }
              placeholder={
                text.taggingTool.tagging.singleToken.modal.placeholder
              }
              aria-label={
                text.taggingTool.tagging.singleToken.modal.placeholderAria
              }
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={ this.handleAlphabeticFilter } className={ this.state.alpahbeticFilter ? 'btn-active' : '' }>
                <i className="fas fa-sort-alpha-down"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>

          { !this.state.alpahbeticFilter ? <div id="classicList" className="list-body">
            { this.state.list.map((obj, i) => (
              <div key={ i } className="list-item">
                <TagButton
                  value={ obj.label }
                  shortkey={ "" }
                  showTooltipIcon={ false }
                  tooltip={ "" }
                  color={ "#00a6ff" }
                  onClick={ () => this.props.onClick(obj) }
                />
              </div>
            )) }
          </div> : <Accordion defaultActiveKey="0">
              { this.state.list.map((obj, i) => (
                <Card key={ i }>
                  <Accordion.Toggle as={ Card.Header } eventKey={ i }>
                    { obj.letter }
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={ i }>
                    <Card.Body>
                      { this.state.list[ i ].values.map((subobj, j) => (
                        <div key={ j } className="list-item">
                          <TagButton
                            value={ subobj.label }
                            shortkey={ "" }
                            showTooltipIcon={ false }
                            tooltip={ "" }
                            color={ "#00a6ff" }
                            onClick={ () => this.props.onClick(subobj) }
                          />
                        </div>
                      )) }
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )) }
            </Accordion> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ this.props.onDelete }>
            { text.taggingTool.tagging.singleToken.modal.buttonLabel }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  handleChange = event =>
  {
    this.setState({ alpahbeticFilter: false });
    var input = this.state.input;
    input = event.target.value;
    this.setState({ input });
    var tokens = [ ...this.props.list ];
    const list = tokens.filter(element => element.label.indexOf(input) !== -1);
    this.setState({ list });
  };

  handleAlphabeticFilter = () => 
  {
    var keywords = this.state.list;
    if (!this.state.alpahbeticFilter)
    {
      const filteredList = keywords
        .filter((keyword, index) => keywords.lastIndexOf(keyword) === index)
        .sort((a, b) => a.label < b.label ? -1 : 1);
      let newarray = [];
      let beginning = "0-9";
      let arrayByLetter = [];
      let firstLetter = "";
      filteredList.forEach(element =>
      {
        firstLetter = element.label[ 0 ];
        if (firstLetter.match("[0-9]"))
        {
          arrayByLetter.push(element);
        }
        else if (firstLetter === beginning)
        {
          arrayByLetter.push(element);
        } else
        {
          newarray.push({ letter: beginning, values: arrayByLetter });
          beginning = firstLetter;
          arrayByLetter = [];
        }
      });
      this.setState({ list: newarray });
      this.setState({ alpahbeticFilter: true });
    } else
    {
      let tmpArray = [];
      keywords.forEach(element =>
      {
        tmpArray = tmpArray.concat(element.values);
      });
      const filteredList = tmpArray
        .filter((keyword, index) => tmpArray.lastIndexOf(keyword) === index)
        .sort((a, b) => a.index < b.index ? -1 : 1);
      this.setState({ list: filteredList });
      this.setState({ alpahbeticFilter: false });
    }
  }
}

export default List;
