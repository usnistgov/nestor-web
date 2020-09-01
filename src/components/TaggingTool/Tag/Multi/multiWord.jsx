import React, { Component } from "react";
import "../TagComponents/tag.css";
import TagButton from "../TagComponents/tagButton";
import Note from "../TagComponents/note";
import { updateMultiTokens, updateVocab } from "./multiTokensAction";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import List from "../TagComponents/list";
import text from "../../../../assets/language/en.js";
import { ProgressBar } from 'react-bootstrap';
import { getCompleteness } from '../../Report/reportAction';
import Alert from "../../../CommonComponents/Alert/alert";
import { exportOutput } from "../../Export/exportAction";
import Button from 'react-bootstrap/Button'

/**
 * Component for multi word page.
 * 
 * @component
 */
class MultiWord extends Component {

  /** 
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showNoClassificationModal: false
    }
  }

  /**
   * A react lifecycle method called when the component did mount.
   * It inits the multi word tokens with the appropriate alias and also
   * get the completeness of the project to update the progress bar
   */
  componentDidMount() {
    // this.props.onExportOutput();
    this.initTokenWithSynonymAlias(this.props.match.params.id);
    this.props.onGetCompleteness();
  }

  /**
 * A react lifecycle method to determine whether or not the component should update
 * @param {props} nextProps the new props of the application
 * @returns true if multi tokens props changed or if the search modal
 * display has changed
 */
  shouldComponentUpdate(nextProps) {
    return nextProps.multiTokens !== this.props.multiTokens ||
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.showModal !== this.state.showModal
      ? true
      : false;
  }


  /**
 * A react lifecycle method called when the component did update.
 * Checks whether the props match.id changed and init tokens 
 * with appropriate alias, get the completeness of the project,
 * and update the vocab of multi grams.
 */
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.initTokenWithSynonymAlias(this.props.match.params.id);
      this.props.onUpdateVocab(
        this.props.multiTokens[prevProps.match.params.id]
      );
      this.props.onGetCompleteness();
    }
  }

  /**
   * The render function.
   */
  render() {
    return (
      <div className="tag-container">
        {this.state.showNoClassificationModal && (
          <Alert
            alertHeader={text.taggingTool.alerts.tag.noClassificationHeader}
            alertMessage={text.taggingTool.alerts.tag.noClassificationMessage}
            styleColor="alert alert-danger"
            onDelete={this.handleHideNoClassificationAlert}
          />
        )}
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
              key={1}
            />
            <br />
            <h4>{this.props.multiTokens[parseInt(this.props.match.params.id)].label}</h4>
            <div>Alias</div>
            <div className="alias">
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
              </div>
            </div>
            <br />
            <div>Hybrid Classification</div>
            <div className="classification-tags">
              <br />
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
            <br />
            <div>Classification</div>
            <div className="classification-tags">
              <br />
              {this.props.classification.types.map((obj, i) => (
                <TagButton
                  key={i}
                  value={obj.label}
                  shortkey={obj.shortkey}
                  showTooltipIcon={false}
                  showCloseIcon={false}
                  tooltip={""}
                  color={obj.color}
                  style={{ borderColor: obj.color }}
                  onClick={this.handleAddClassification}
                />
              ))}
            </div>
            <div className="buttons">
              {window.multiTokensHistory.length > 0 &&
                <Button
                  size="sm"
                  onClick={this.handleBack}
                  className="back-button"
                  label="Back to Single Word"
                  variant="outline-primary"
                >
                  <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Back to Single Word
                </Button>}
              <Button
                size="sm"
                onClick={this.handleContinue}
                variant="primary"
                label="Continue"
                className="btn-continue">
                Continue&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
              </Button>
            </div>
          </div>
          <div className="token-view">
            <h4>Summary</h4>
            <input
              type="text"
              className="form-control"
              value={
                this.props.multiTokens[
                  parseInt(this.props.match.params.id)
                ].alias
              }
              readOnly
            />
            {this.props.multiTokens[parseInt(this.props.match.params.id)]
              .classification.label ? <div
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
              </div> : <div
                className="badge-no-classification"
              >
                No classification
                </div>}
            <br />
            <div>Composed by</div>
            {this.props.multiTokens[parseInt(this.props.match.params.id)].composedWith.map((obj, i) => (
              <Button
                variant="outline-dark"
                className="composedwith-button"
                key={i}
                onClick={() => this.handleClickOnSingleToken(obj)}
              >{obj.label}</Button>
            ))}
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
      </div>
    );
  }

  /**
   * function called when clicking on the back to single Token button
   * it reset the history of multitokens to empty and then redirect to 
   * singleTokens 
   * @function
   */
  handleBack = () => {
    const backToSingleToken = window.multiTokensHistory[window.multiTokensHistory.length - 1];
    window.multiTokensHistory = [];
    this.props.history.push(backToSingleToken);
  }

  /**
   * function when clicked on a single token in the composed by section
   * it update the singleToken History with current path in the application
   * and redirect to the single token clicked on
   * @param {token} token The single word token clicked on Back to single token button
   * @function
   */
  handleClickOnSingleToken = token => {
    window.singleTokenHistory.push("/taggingTool/tag/multi/" + this.props.multiTokens[parseInt(this.props.match.params.id)].index);
    this.props.history.push("/taggingTool/tag/single/" + token.index);
  }

  /**
   * function called when clicking on a multi word token 
   * It hides the search modal and redirect to the multi token clicked
   * @param {token} token the token clicked on in the search modal
   * @function
   */
  handleClickList = token => {
    this.handleDeleteModal();
    this.props.history.push("/taggingTool/tag/multi/" + token.index);
  };

  /**
   * function called when clicking on the continue button
   * it checks if a classification has been selected and then redirect 
   * to the next multi token in the list ranked by tf-idf
   * @function
   */
  handleContinue = () => {
    if (this.props.multiTokens[parseInt(this.props.match.params.id)].classification.color === "") {
      this.setState({ showNoClassificationModal: true });
      return null;
    } else {
      this.setState({ showNoClassificationModal: false });
    }
    var index = [...this.props.multiTokens].findIndex(
      element => element.classification.color === ""
    );
    if (index === -1) {
      this.props.history.push("/taggingTool/report");
    } else {
      this.props.history.push("/taggingTool/tag/multi/" + index);
    }
  };

  /**
   * function that hide the alert message when trying to continue
   * without classification selected
   * @function
   */
  handleHideNoClassificationAlert = () => {
    this.setState({ showNoClassificationModal: false });
  }

  /**
   * function to hide modal of search among between multi words
   * @function
   */
  handleDeleteModal = () => {
    this.setState({ showModal: false });
  };

  /**
   * function to show the modal of search among all the multi words 
   * @function
   */
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  /** 
   * function to update the the value of the alias of the current multiToken
   * @param {event} event the event generated when typing in the alias form field
   * @function
   */
  updateValue = event => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.alias = event.target.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };

  /**
   * function to add a classification to the current multi word
   * @param {classificationTag} classificationTag The classification of the multi word
   * @function
   */
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

  /**
   * function to toggle the text area of the note of the current multi word
   * @function
   */
  handleToggle = () => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.note.showNote = !token.note.showNote;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };

  /**
   * function to change the texte of the note 
   * @param {event} event event generated automatically when typing in the typing area
   * @function
   */
  handleChangeNote = event => {
    var tokens = [...this.props.multiTokens];
    var token = {
      ...this.props.multiTokens[parseInt(this.props.match.params.id)]
    };
    token.note.value = event.target.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateMultiTokens(tokens);
  };
  handleAddNote = () => { };
  handleEditNote = () => { };

  /**
   * function to init all the multitokens with the appropriate alias,
   * basically their label, and also set the single tokens which composed the
   * current multi word  
   * @function
   */
  initTokenWithSynonymAlias(index) {
    var tokens = [...this.props.multiTokens];
    var token = { ...this.props.multiTokens[index] };

    if (token.synonyms.length < 1) {
      // var synonyms = this.computeSynonyms(token.label);
      // token.synonyms = synonyms;
      tokens[index] = token;
    }
    if (!token.alias) {
      token.alias = token.label;
      var multiTokenSplitted = token.alias.split(" ");
      this.props.singleTokens.forEach((singleToken) => {
        if (singleToken.label === multiTokenSplitted[0] || singleToken.label === multiTokenSplitted[1]) {
          token.composedWith.push(JSON.parse(JSON.stringify(singleToken)));
        }
      });
    }
    this.props.onUpdateMultiTokens(tokens);
  }
}
const mapStateToProps = createSelector(
  state => state.multiTokens,
  state => state.singleTokens,
  state => state.classification,
  state => state.report,
  state => state.export,
  (multiTokens, singleTokens, classification, report, ex) => ({
    multiTokens,
    report,
    singleTokens,
    classification,
    ex,
  })
);
const mapActionsToProps = {
  onGetCompleteness: getCompleteness,
  onUpdateMultiTokens: updateMultiTokens,
  onUpdateVocab: updateVocab,
  onExportOutput: exportOutput
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(MultiWord);
