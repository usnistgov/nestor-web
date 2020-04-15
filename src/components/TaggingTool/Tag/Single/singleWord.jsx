import React, { Component } from "react";
import "../TagComponents/tag.css";
import TagButton from "../TagComponents/tagButton";
import Note from "../TagComponents/note";
import Buttton from "../../../CommonComponents/Button/button";
import { updateSingleTokens, updateVocab } from "./singleTokensAction";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Alert from "../../../CommonComponents/Alert/alert";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import text from "../../../../assets/language/en.js";
import List from "../TagComponents/list";
import { ProgressBar } from "react-bootstrap";
import { getCompleteness } from "../../Report/reportAction";
import { exportOutput } from "../../Export/exportAction";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal"

const fuzz = window.fuzz;

class SingleWord extends Component
{
  state = {
    showModal: false,
    showNoClassificationModal: false,
    expanded: false,
    currentMultiTokens: []
  };
  componentDidMount()
  {
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.tag.header,
      alertMessage: text.taggingTool.alerts.tag.message
    };
    this.props.onUpdateAlert(alert);
    this.props.onExportOutput();
    this.initTokenWithSynonymAlias(this.props.match.params.id);
    this.props.onGetCompleteness();
  }
  shouldComponentUpdate(nextProps)
  {
    //debugger;
    return nextProps.singleTokens !== this.props.singleTokens ||
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.showModal !== this.state.showModal
      ? true
      : false;
  }
  componentDidUpdate(prevProps)
  {
    // debugger;
    this.refreshSynonyms();
    if (prevProps.match.params.id !== this.props.match.params.id)
    {
      this.initTokenWithSynonymAlias(this.props.match.params.id);
      this.props.onUpdateVocab(
        this.props.singleTokens[ prevProps.match.params.id ]
      );
      this.props.onGetCompleteness();
    }
    console.log(this.state.currentAppearsIn);
  }
  render()
  {
    return (
      <div className="tag-container">
        { this.state.showNoClassificationModal && (
          <Alert 
            alertHeader={text.taggingTool.alerts.tag.noClassificationHeader}
            alertMessage={text.taggingTool.alerts.tag.noClassificationMessage}
            styleColor="alert alert-danger"
            onDelete={this.handleDeleteNoClassificationAlert}
          />
        ) }
        { this.props.alert.showAlert && (
          <Alert
            alertHeader={ this.props.alert.alertHeader }
            alertMessage={ this.props.alert.alertMessage }
            styleColor="alert alert-success"
            onDelete={ this.handleDelete }
          />
        ) }
        <div className="tag-section">
          <div className="token-tagging-section">
            <ProgressBar
              animated
              striped
              variant="success"
              now={
                this.props.report.total === this.props.report.empty
                  ? 0
                  : ((this.props.report.total -
                    this.props.report.empty -
                    this.props.report.complete) /
                    this.props.report.total) *
                  100
              }
              label={
                this.props.report.total === this.props.report.empty
                  ? 0
                  : (
                    ((this.props.report.total -
                      this.props.report.empty -
                      this.props.report.complete) /
                      this.props.report.total) *
                    100
                  ).toFixed(2) + " % Complete"
              }
              key={ 1 }
            />
            <br />
            <h4>{this.props.singleTokens[ parseInt(this.props.match.params.id) ].label}</h4>
            <div>Alias</div>
            <div className="alias">
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter alias"
                  value={
                    this.props.singleTokens[
                      parseInt(this.props.match.params.id)
                    ].alias
                  }
                  onChange={ this.updateValue }
                />
                { false && (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={ this.addAlias }
                  >
                    { text.taggingTool.tagging.singleToken.addButton }
                  </button>
                ) }
              </div>
            </div>
            <br />
            <div>Classification</div>
            <div className="classification-tags">
              <br/>
              { this.props.classification.types.map((obj, i) => (
                <TagButton
                  key={ i }
                  value={ obj.label }
                  shortkey={ obj.shortkey }
                  showTooltipIcon={ false }
                  showCloseIcon={ false }
                  tooltip={ "" }
                  color={ obj.color }
                  style={ { borderColor: obj.color } }
                  onClick={ this.handleAddClassification }
                />
              )) }
            </div>
            <div>
              { text.taggingTool.tagging.singleToken.synonymSectionTitle }
            </div>
            <div className="synonyms-tags">
              { this.props.singleTokens[
                parseInt(this.props.match.params.id)
              ].synonyms.map((obj, i) => (
                <TagButton
                  key={ i }
                  value={ obj.label }
                  shortkey={ "" }
                  showTooltipIcon={ true }
                  showCloseIcon={ false }
                  tooltip={ obj.tooltip }
                  color={ "black" }
                  style={ { borderColor: "black" } }
                  onClick={ this.handleSelectSynonym }
                />
              )) }
            </div>
          </div>
          <div className="token-view">
            <h4>Summary</h4>
            <input
                  type="text"
                  className="form-control"
                  value={
                    this.props.singleTokens[
                      parseInt(this.props.match.params.id)
                    ].alias
                  }
                  readOnly
                />
            { this.props.singleTokens[ parseInt(this.props.match.params.id) ]
              .classification.label ? <div
              className="badge"
              style={ {
                borderColor: this.props.singleTokens[
                  parseInt(this.props.match.params.id)
                ].classification.color
              } }
            >
              {
                this.props.singleTokens[ parseInt(this.props.match.params.id) ]
                  .classification.value
              }
            </div> : <div
                  className="badge-no-classification"
                >
                  No classification
                </div>}
            <div>
              { text.taggingTool.tagging.singleToken.synonymSectionTitle }
            </div>
            <div className="synonyms-tags selected">
              { this.props.singleTokens[
                parseInt(this.props.match.params.id)
              ].selectedSynonyms.map((obj, i) => (
                <TagButton
                  key={ i }
                  value={ obj.value }
                  shortkey={ "" }
                  showTooltipIcon={ true }
                  showCloseIcon={ true }
                  tooltip={ obj.tooltip }
                  color={ "black" }
                  style={ { borderColor: "black" } }
                  onClick={ this.handleDeleteSynonym }
                />
              )) }
            </div>
            <br/>
            <div>Appears in</div>
            { this.state.expanded ? 
            <div className="summary-appearsIn-container">
              <Modal
                size="lg"
                show={ this.state.expanded }
                onHide={() => this.setState({expanded:false}) }>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <i className="fas fa-list"></i>
                    &nbsp;
                    List of Multitokens 
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  All the multiTokens where the singleToken <strong>{this.props.singleTokens[ parseInt(this.props.match.params.id)].label}</strong> appeared are listed below.
                  You can click on them to tag these multiTokens.
                  <div className="multiTokens-container"> {this.props.singleTokens[ parseInt(this.props.match.params.id)].appearsIn.map((obj, i) => (
                    <Button
                      variant="outline-dark"
                      className="composedwith-button-modal"
                      key={ i }
                      onClick={ () => this.handleClickOnMultiToken(obj) }
                      >{obj.label}</Button>
                    ))}
              </div> 
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={ () => this.setState({expanded:false}) }>
                  { text.taggingTool.tagging.singleToken.modal.buttonLabel }
                </Button>
              </Modal.Footer>
            </Modal>
              </div>:
               <div className="fullwidth"> {this.state.currentMultiTokens.map((obj, i) => (
                <Button
                  variant="outline-dark"
                  className="composedwith-button"
                  key={ i }
                  onClick={ () => this.handleClickOnMultiToken(obj) }
                >{obj.label}</Button>
              ))}
              <Button className="button-moremultitokens" variant="link" onClick={() => this.showMoreOrLess()}>
                More
              </Button>
              </div> }
            <Note
              showNote={
                this.props.singleTokens[ parseInt(this.props.match.params.id) ]
                  .note.showNote
              }
              value={
                this.props.singleTokens[ parseInt(this.props.match.params.id) ]
                  .note.value
              }
              onClick={ this.handleToggle }
              onAdd={ this.handleAddNote }
              onChangeNote={ this.handleChangeNote }
              disabled={ false }
              onEdit={ this.handleEditNote }
            />
          </div>
          <div className="side-bar">
            <i
              className="far fa-window-maximize"
              onClick={ this.handleShowModal }
            />
          </div>
          <List
            showModal={ this.state.showModal }
            onDelete={ this.handleDeleteModal }
            onClick={ this.handleClickList }
            list={ this.props.singleTokens }
          />
        </div>
        <div className="buttons">
          <Buttton
            onClick={ this.handleContinue }
            class="btn btn-primary"
            label="Continue"
          />
        </div>
      </div>
    );
  }
  handleClickOnMultiToken = multiToken => {
    console.log(multiToken);
    this.props.history.push("/taggingTool/tag/multi/" + multiToken.index);
  }
  handleClickList = token =>
  {
    this.handleDeleteModal();
    this.props.history.push("/taggingTool/tag/single/" + token.index);
  };
  handleContinue = history =>
  {
    if(this.props.singleTokens[ parseInt(this.props.match.params.id) ].classification.color === ""){
      this.setState({showNoClassificationModal:true});
      return null;
    }else{
      this.setState({showNoClassificationModal:false});
    }
    var i = parseInt(this.props.match.params.id);
    var tokens = [ ...this.props.singleTokens ];
    tokens[ i ].selectedSynonyms.forEach(synonym =>
    {
      var syn = tokens.find(element =>
      {
        return element.label === synonym.value;
      });
      syn.classification = tokens[ i ].classification;
      syn.alias = tokens[ i ].alias;
      syn.notes = tokens[ i ].notes;
      tokens[ syn.index ] = syn;
    });
    this.props.onUpdateSingleTokens(JSON.parse(JSON.stringify(tokens)));
    var index = tokens.findIndex(element => element.classification.color === "");
    //debugger;
    if (index === -1)
    {
      history.push("/taggingTool/tag/multi");
    } else
    {
      history.push("/taggingTool/tag/single/" + index);
    }
  };
  showMoreOrLess = () => {
    this.setState({expanded: !this.state.expanded});
  }
  handleDeleteNoClassificationAlert = () => {
    this.setState({showNoClassificationModal: false});
  }
  handleDeleteModal = () =>
  {
    this.setState({ showModal: false });
  };
  handleShowModal = () =>
  {
    this.setState({ showModal: true });
  };
  handleDelete = () =>
  {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
    this.props.onUpdateAlert(alert);
  };
  updateValue = event =>
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    token.alias = event.target.value;
    tokens[ parseInt(this.props.match.params.id) ] = token;
    this.props.onUpdateSingleTokens(tokens);
  };
  addAlias = () =>
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    token.alias = token.aliasInput;
    tokens[ parseInt(this.props.match.params.id) ] = token;
    this.props.onUpdateSingleTokens(tokens);
  };
  handleAddClassification = classificationTag =>
  {
    //classificationTag.style = { borderColor: "black" };
    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    token.classification.color = classificationTag.color;
    token.classification.label = classificationTag.shortkey;
    token.classification.value = classificationTag.value;
    tokens[ parseInt(this.props.match.params.id) ] = token;
    this.props.onUpdateSingleTokens(tokens);
  };
  handleToggle = () =>
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    token.note.showNote = !token.note.showNote;
    tokens[ parseInt(this.props.match.params.id) ] = token;
    this.props.onUpdateSingleTokens(tokens);
  };
  handleChangeNote = event =>
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    token.note.value = event.target.value;
    tokens[ parseInt(this.props.match.params.id) ] = token;
    this.props.onUpdateSingleTokens(tokens);
  };
  handleAddNote = () => { };
  handleEditNote = () => { };
  handleDeleteSynonym = synonym =>
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    var selectedSynonyms = token.selectedSynonyms.filter(element =>
    {
      return element.value !== synonym.value;
    });
    var synonyms = this.computeSynonyms(token.label);
    var synonymToBeAdded = synonyms.filter(element =>
    {
      return element.label === synonym.value;
    })[ 0 ];
    token.synonyms.push(synonymToBeAdded);
    token.selectedSynonyms = selectedSynonyms;
    tokens[ parseInt(this.props.match.params.id) ] = token;
    this.props.onUpdateSingleTokens(tokens);
  };
  handleSelectSynonym = synonym =>
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    var found = token.selectedSynonyms.find(element =>
    {
      return element.value === synonym.value;
    });
    if (!found)
    {
      token.selectedSynonyms.push(synonym);
      token.synonyms = token.synonyms.filter(element =>
      {
        return element.label !== synonym.value;
      });
      tokens[ parseInt(this.props.match.params.id) ] = token;
      this.props.onUpdateSingleTokens(tokens);
    }
  };

refreshSynonyms = () => 
{
  this.props.singleTokens.forEach(element =>
    {
      element.synonyms.forEach((synonym)=> {
        synonym.tooltip = [];
        this.props.ex.output.filter((outputLine)=>{
          var tmpInputDataParsed = outputLine[0].toLowerCase().split(" ");
          tmpInputDataParsed.map( (token)=>{
            if(token === (synonym.label.toLowerCase()) && synonym.tooltip.length<3){
              synonym.tooltip.push(outputLine[0]);
            }
            return true;
          });
          return true;
        })
      });      
    });
  }

  computeSynonyms = label =>
  {
    var synonyms = [];
    this.props.singleTokens.forEach(element =>
    {
      if (
        fuzz.ratio(label, element.label) > this.props.pattern &&
        element.label !== label
      )
      {
        element.tooltip = ["synonym appeared there"];
        synonyms.push(element);
      }
    });
    return synonyms;
  };
  initTokenWithSynonymAlias(index)
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = { ...this.props.singleTokens[ index ] };
    // if the token doesn't have synonyms and it doesn't have any selected synonyms
    if (token.synonyms.length < 1 && token.selectedSynonyms.length === 0)
    {
      var synonyms = this.computeSynonyms(token.label);
      token.synonyms = synonyms;
      tokens[ index ] = token;
    }
    if (!token.alias)
    {
      token.alias = token.label;
    }
    this.props.multiTokens.map((multiToken) => {
      var multiTokenSplitted = multiToken.label.split(" ");
      if(token.label === multiTokenSplitted[0] || token.label === multiTokenSplitted[1]){
        token.appearsIn.push(multiToken);
      }
    });
    this.setState({currentMultiTokens: token.appearsIn.slice(0,3)});
    this.props.onUpdateSingleTokens(tokens);
  }
}
const mapStateToProps = createSelector(
  state => state.singleTokens,
  state => state.classification,
  state => state.tokensNumber,
  state => state.alert,
  state => state.pattern,
  state => state.similarity,
  state => state.report,
  state => state.dragAndDrops,
  state => state.export,
  state => state.multiTokens,
  (
    singleTokens,
    classification,
    tokensNumber,
    alert,
    pattern,
    similarity,
    report,
    dragAndDrops,
    ex,
    multiTokens
  ) => ({
    singleTokens,
    classification,
    tokensNumber,
    alert,
    pattern,
    similarity,
    report,
    dragAndDrops,
    ex,
    multiTokens
  })
);
const mapActionsToProps = {
  onUpdateSingleTokens: updateSingleTokens,
  onUpdateVocab: updateVocab,
  onUpdateAlert: updateAlert,
  onGetCompleteness: getCompleteness,
  onExportOutput: exportOutput
};
export default connect(mapStateToProps, mapActionsToProps)(SingleWord);
