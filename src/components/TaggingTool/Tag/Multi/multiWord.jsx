import React, { Component } from "react";
import "../TagComponents/tag.css";
import TagButton from "../TagComponents/tagButton";
import Note from "../TagComponents/note";
import Button from "../../../CommonComponents/Button/button";
import { updateMultiTokens, updateVocab } from "./multiTokensAction";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import List from "../TagComponents/list";
import text from "../../../../assets/language/en.js";

class MultiWord extends Component {
  state = {
    showModal: false
  };
  componentDidMount() {
    this.initTokenWithSynonymAlias(this.props.match.params.id);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.multiTokens !== this.props.multiTokens ||
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.showModal !== this.state.showModal
      ? true
      : false;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.initTokenWithSynonymAlias(this.props.match.params.id);
      this.props.onUpdateVocab(
        this.props.multiTokens[prevProps.match.params.id]
      );
    }
  }
  render() {
    return (
      <div className="tag-container">
        <div className="tag-section">
          <div className="token-tagging-section">
            <div className="alias">
              <TagButton
                value={
                  this.props.multiTokens[parseInt(this.props.match.params.id)]
                    .label
                }
                showTooltipIcon={true}
                tooltip={text.taggingTool.tagging.singleToken.tokenTooltip}
                color={"transparent"}
                style={{ borderColor: "transparent" }}
                buttonTag={""}
                onClick={this.handleContinue}
              />
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter alias"
                  value={
                    this.props.multiTokens[parseInt(this.props.match.params.id)]
                      .alias
                  }
                  onChange={this.updateValue}
                />
                {false && (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={this.addAlias}
                  >
                    {text.taggingTool.tagging.singleToken.addButton}
                  </button>
                )}
              </div>
            </div>
            <div className="classification-tags">
              {this.props.classification.rules.map((obj, i) => (
                <TagButton
                  key={i}
                  value={obj.label}
                  shortkey={obj.shortkey}
                  showTooltipIcon={false}
                  tooltip={""}
                  color={obj.color}
                  style={{ borderColor: obj.color }}
                  onClick={this.handleAddClassification}
                />
              ))}
            </div>
          </div>
          <div className="token-view">
            <div
              className="badge"
              style={{
                borderColor: "black"
              }}
            >
              {
                this.props.multiTokens[parseInt(this.props.match.params.id)]
                  .alias
              }
            </div>
            {this.props.multiTokens[parseInt(this.props.match.params.id)]
              .classification.label && (
              <div
                className="badge"
                style={{
                  borderColor: this.props.multiTokens[
                    parseInt(this.props.match.params.id)
                  ].classification.color
                }}
              >
                {
                  this.props.multiTokens[parseInt(this.props.match.params.id)]
                    .classification.value
                }
              </div>
            )}
            <div>
              {text.taggingTool.tagging.singleToken.synonymSectionTitle}
            </div>
            <div className="synonyms-tags selected">
              {this.props.multiTokens[
                parseInt(this.props.match.params.id)
              ].synonyms.map((obj, i) => (
                <TagButton
                  key={i}
                  value={obj.label}
                  shortkey={""}
                  showTooltipIcon={false}
                  tooltip={""}
                  color={"black"}
                  style={{ borderColor: "black" }}
                  onClick={this.handleDeleteSynonym}
                />
              ))}
            </div>
            <Note
              showNote={
                this.props.multiTokens[parseInt(this.props.match.params.id)]
                  .note.showNote
              }
              value={
                this.props.multiTokens[parseInt(this.props.match.params.id)]
                  .note.value
              }
              onClick={this.handleToggle}
              onAdd={this.handleAddNote}
              onChangeNote={this.handleChangeNote}
              disabled={false}
              onEdit={this.handleEditNote}
            />
          </div>
          <div className="side-bar">
            <i
              className="far fa-window-maximize"
              onClick={this.handleShowModal}
            />
          </div>
          <List
            showModal={this.state.showModal}
            onDelete={this.handleDeleteModal}
            onClick={this.handleClickList}
            list={this.props.multiTokens}
          />
        </div>

        <div className="buttons">
          <Button
            onClick={this.handleContinue}
            class="btn btn-primary"
            label="Continue"
          />
        </div>
      </div>
    );
  }
  handleClickList = token => {
    this.handleDeleteModal();
    this.props.history.push("/taggingTool/tag/multi/" + token.index);
  };
  handleContinue = history => {
    var index = [...this.props.multiTokens].findIndex(
      element => !element.alias
    );
    if (index === -1) {
      history.push("/taggingTool/report");
    } else {
      history.push("/taggingTool/tag/multi/" + index);
    }
  };
  handleDeleteModal = () => {
    this.setState({ showModal: false });
  };
  handleShowModal = () => {
    this.setState({ showModal: true });
  };
  updateValue = event => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.alias = event.target.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };
  addAlias = () => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.alias = token.aliasInput;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };
  handleAddClassification = classificationTag => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.classification.color = classificationTag.color;
    token.classification.label = classificationTag.shortkey;
    token.classification.value = classificationTag.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };
  handleToggle = () => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.note.showNote = !token.note.showNote;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };
  handleChangeNote = event => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.note.value = event.target.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };
  handleAddNote = () => {};
  handleEditNote = () => {};
  handleDeleteSynonym = synonym => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    var selectedSynonyms = token.selectedSynonyms.filter(element => {
      return element.value !== synonym.value;
    });
    token.selectedSynonyms = selectedSynonyms;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };
  handleSelectSynonym = synonym => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    var found = token.selectedSynonyms.find(element => {
      return element.value === synonym.value;
    });
    if (!found) {
      token.selectedSynonyms.push(synonym);
      tokens[parseInt(this.props.match.params.id)] = token;
      this.props.onUpdateMultiTokens(tokens);
    }
  };
  computeSynonyms = label => {
    var labels = label.split(" ");
    var synonyms = [];
    labels.forEach(label => {
      this.props.singleTokens.forEach(token => {
        if (token.label === label) {
          token.synonyms.forEach(synonym => {
            synonyms.push(synonym);
          });
        }
      });
    });
    return synonyms;
  };
  initTokenWithSynonymAlias(index) {
    var tokens = [...this.props.multiTokens];
    var token = { ...this.props.multiTokens[index] };

    if (token.synonyms.length < 1) {
      var synonyms = this.computeSynonyms(token.label);
      token.synonyms = synonyms;
      tokens[index] = token;
    }
    if (!token.alias) {
      token.alias = token.label;
    }
    this.props.onUpdateMultiTokens(tokens);
  }
}
const mapStateToProps = createSelector(
  state => state.multiTokens,
  state => state.singleTokens,
  state => state.classification,
  (multiTokens, singleTokens, classification) => ({
    multiTokens,
    singleTokens,
    classification
  })
);
const mapActionsToProps = {
  onUpdateMultiTokens: updateMultiTokens,
  onUpdateVocab: updateVocab
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(MultiWord);
