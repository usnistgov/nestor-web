import React, { Component } from "react";
import "../TagComponents/tag.css";
import TagButton from "../TagComponents/tagButton";
import Note from "../TagComponents/note";
import Button from "../../../CommonComponents/Button/button";
import { updateSingleTokens, updateVocab } from "./singleTokensAction";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Alert from "../../../CommonComponents/Alert/alert";
import { updateAlert } from "../../../CommonComponents/Alert/alertAction";
import text from "../../../../assets/language/en.js";
import List from "../TagComponents/list";
import { ProgressBar } from "react-bootstrap";
import { getCompleteness } from "../../Report/reportAction";

const fuzz = window.fuzz;

class SingleWord extends Component
{
  state = {
    showModal: false
  };
  componentDidMount()
  {
    //debugger;
    var alert = {
      showAlert: false,
      alertHeader: text.taggingTool.alerts.tag.header,
      alertMessage: text.taggingTool.alerts.tag.message
    };
    this.props.onUpdateAlert(alert);
    this.initTokenWithSynonymAlias(this.props.match.params.id);
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
    //debugger;
    if (prevProps.match.params.id !== this.props.match.params.id)
    {
      this.initTokenWithSynonymAlias(this.props.match.params.id);
      //debugger;
      this.props.onUpdateVocab(
        this.props.singleTokens[ prevProps.match.params.id ]
      );
      this.props.onGetCompleteness();
    }
  }
  render()
  {
    return (
      <div className="tag-container">
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
                  ).toFixed(2) + " %"
              }
              key={ 1 }
            />
            <div className="alias">
              <TagButton
                value={
                  this.props.singleTokens[ parseInt(this.props.match.params.id) ]
                    .label
                }
                showTooltipIcon={ true }
                showCloseIcon={ false }
                tooltip={ text.taggingTool.tagging.singleToken.tokenTooltip }
                color={ "transparent" }
                style={ { borderColor: "transparent" } }
                buttonTag={ "" }
                onClick={ this.handleAddNote }
              />
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
            <div className="classification-tags">
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
                  showTooltipIcon={ false }
                  showCloseIcon={ false }
                  tooltip={ "" }
                  color={ "black" }
                  style={ { borderColor: "black" } }
                  onClick={ this.handleSelectSynonym }
                />
              )) }
            </div>
          </div>
          <div className="token-view">
            <div
              className="badge"
              style={ {
                borderColor: "black"
              } }
            >
              {
                this.props.singleTokens[ parseInt(this.props.match.params.id) ]
                  .alias
              }
            </div>
            { this.props.singleTokens[ parseInt(this.props.match.params.id) ]
              .classification.label && (
                <div
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
                </div>
              ) }
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
                  showTooltipIcon={ false }
                  showCloseIcon={ true }
                  tooltip={ "" }
                  color={ "black" }
                  style={ { borderColor: "black" } }
                  onClick={ this.handleDeleteSynonym }
                />
              )) }
            </div>
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
          <Button
            onClick={ this.handleContinue }
            class="btn btn-primary"
            label="Continue"
          />
        </div>
      </div>
    );
  }
  handleClickList = token =>
  {
    this.handleDeleteModal();
    this.props.history.push("/taggingTool/tag/single/" + token.index);
  };
  handleContinue = history =>
  {
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
    this.props.onUpdateSingleTokens(tokens);
    var index = tokens.findIndex(element => !element.alias);
    //debugger;
    if (index === -1)
    {
      history.push("/taggingTool/tag/multi");
    } else
    {
      history.push("/taggingTool/tag/single/" + index);
    }
  };
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
    console.log(synonym);

    var tokens = [ ...this.props.singleTokens ];
    var token = {
      ...this.props.singleTokens[ parseInt(this.props.match.params.id) ]
    };
    var selectedSynonyms = token.selectedSynonyms.filter(element =>
    {
      return element.value !== synonym.value;
    });
    console.log(token.synonyms);
    console.log(token.selectedSynonyms);
    token.synonyms.push(synonym);
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
        synonyms.push(element);
      }
    });
    console.log(synonyms);
    return synonyms;
  };
  initTokenWithSynonymAlias(index)
  {
    var tokens = [ ...this.props.singleTokens ];
    var token = { ...this.props.singleTokens[ index ] };
    if (token.synonyms.length < 1)
    {
      var synonyms = this.computeSynonyms(token.label);
      token.synonyms = synonyms;
      tokens[ index ] = token;
    }
    if (!token.alias)
    {
      token.alias = token.label;
    }
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
  (
    singleTokens,
    classification,
    tokensNumber,
    alert,
    pattern,
    similarity,
    report
  ) => ({
    singleTokens,
    classification,
    tokensNumber,
    alert,
    pattern,
    similarity,
    report
  })
);
const mapActionsToProps = {
  onUpdateSingleTokens: updateSingleTokens,
  onUpdateVocab: updateVocab,
  onUpdateAlert: updateAlert,
  onGetCompleteness: getCompleteness
};
export default connect(mapStateToProps, mapActionsToProps)(SingleWord);
