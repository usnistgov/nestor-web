import React, { Component } from "react";
import "../TagComponents/tag.css";
import TagButton from "../TagComponents/tagButton";
import Note from "../TagComponents/note";
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

/**
 * Component for single word page.
 * 
 * @component
 */
class SingleWord extends Component {

  /** 
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showNoClassificationModal: false,
      expanded: false,
      currentMultiTokens: []
    };
  }

  /**
   * A react lifecycle method called when the component did mount.
   * It inits the single word tokens with the appropriate alias and also
   * get the completeness of the project to update the progress bar, and update
   * the alert if needed
   */
  componentDidMount() {
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

  /**
   * A react lifecycle method to determine whether or not the component should update
   * @param {props} nextProps the new props of the application
   * @returns true if single tokens props changed or if the search modal
   * display has changed
   */
  shouldComponentUpdate(nextProps) {
    //debugger;
    return nextProps.singleTokens !== this.props.singleTokens ||
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.showModal !== this.state.showModal
      ? true
      : false;
  }

  /**
   * A react lifecycle method called when the component did update.
   * Checks whether the props match.id changed and init tokens 
   * with appropriate alias, get the completeness of the project,
   * and update the vocab of single grams, and also sets the synonyms
   * for each singleToken
   */
  componentDidUpdate(prevProps) {
    this.refreshSynonyms();
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.initTokenWithSynonymAlias(this.props.match.params.id);
      this.props.onUpdateVocab(
        this.props.singleTokens[prevProps.match.params.id]
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
        {this.props.alert.showAlert && (
          <Alert
            alertHeader={this.props.alert.alertHeader}
            alertMessage={this.props.alert.alertMessage}
            styleColor="alert alert-success"
            onDelete={this.handleDelete}
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
            <h4>{this.props.singleTokens[parseInt(this.props.match.params.id)].label}</h4>
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
                  onChange={this.updateValue}
                />
              </div>
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
            <div>
              {text.taggingTool.tagging.singleToken.synonymSectionTitle}
            </div>
            <div className="synonyms-tags">
              {this.props.singleTokens[
                parseInt(this.props.match.params.id)
              ].synonyms.map((obj, i) => (
                <TagButton
                  key={i}
                  value={obj.label}
                  shortkey={""}
                  showTooltipIcon={true}
                  showCloseIcon={false}
                  tooltip={obj.tooltip}
                  color={"black"}
                  style={{ borderColor: "black" }}
                  onClick={this.handleSelectSynonym}
                />
              ))}
            </div>
            <div className="buttons">
              {window.singleTokenHistory.length > 0 &&
                <Button
                  size="sm"
                  onClick={this.handleBack}
                  className="back-button"
                  label="Back to Multi Word"
                  variant="outline-primary"
                >
                  <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Back to Multi Word
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
                this.props.singleTokens[
                  parseInt(this.props.match.params.id)
                ].alias
              }
              readOnly
            />
            {this.props.singleTokens[parseInt(this.props.match.params.id)]
              .classification.label ? <div
                className="badge"
                style={{
                  borderColor: this.props.singleTokens[
                    parseInt(this.props.match.params.id)
                  ].classification.color
                }}
              >
                {
                  this.props.singleTokens[parseInt(this.props.match.params.id)]
                    .classification.value
                }
              </div> : <div
                className="badge-no-classification"
              >
                No classification
                </div>}
            <div>
              {text.taggingTool.tagging.singleToken.synonymSectionTitle}
            </div>
            <div className="synonyms-tags selected">
              {this.props.singleTokens[
                parseInt(this.props.match.params.id)
              ].selectedSynonyms.map((obj, i) => (
                <TagButton
                  key={i}
                  value={obj.value}
                  shortkey={""}
                  showTooltipIcon={true}
                  showCloseIcon={true}
                  tooltip={obj.tooltip}
                  color={"black"}
                  style={{ borderColor: "black" }}
                  onClick={this.handleDeleteSynonym}
                />
              ))}
            </div>
            <br />
            <div>Appears in</div>
            <div className="summary-appearsIn-container">
              <Modal
                size="lg"
                show={this.state.expanded}
                onHide={() => this.setState({ expanded: false })}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <i className="fas fa-list"></i>
                    &nbsp;
                    List of Multitokens
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  All the multiTokens where the singleToken <strong>{this.props.singleTokens[parseInt(this.props.match.params.id)].label}</strong> appeared are listed below.
                  You can click on them to tag these multiTokens.
                  <div className="multiTokens-container"> {this.props.singleTokens[parseInt(this.props.match.params.id)].appearsIn.map((obj, i) => (
                  <Button
                    variant="outline-dark"
                    className="composedwith-button-modal"
                    key={i}
                    onClick={() => this.handleClickOnMultiToken(obj)}
                  >{obj.label}</Button>
                ))}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.setState({ expanded: false })}>
                    {text.taggingTool.tagging.singleToken.modal.buttonLabel}
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="fullwidth"> {this.state.currentMultiTokens.map((obj, i) => (
              <Button
                variant="outline-dark"
                className="composedwith-button"
                key={i}
                onClick={() => this.handleClickOnMultiToken(obj)}
              >{obj.label}</Button>
            ))}
              <Button className="button-moremultitokens" variant="link" onClick={() => this.showMoreOrLess()}>
                More
              </Button>
            </div>
            <Note
              showNote={
                this.props.singleTokens[parseInt(this.props.match.params.id)]
                  .note.showNote
              }
              value={
                this.props.singleTokens[parseInt(this.props.match.params.id)]
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
            list={this.props.singleTokens}
          />
        </div>
      </div>
    );
  }

  /**
   * function called when clicking on the back to multi Token button
   * it reset the history of singletokens to empty and then redirect to 
   * multitokens 
   * @function
   */
  handleBack = () => {
    const backToMultiToken = window.singleTokenHistory[window.singleTokenHistory.length - 1];
    window.singleTokenHistory = [];
    this.props.history.push(backToMultiToken);
  }

  /**
   * function when clicked on a multi token in the composed by section
   * it update the multiToken History with current path in the application
   * and redirect to the multi token clicked on
   * @param {token} token The multi word token token clicked on 
   * @function
   */
  handleClickOnMultiToken = multiToken => {
    window.multiTokensHistory.push("/taggingTool/tag/single/" + this.props.singleTokens[parseInt(this.props.match.params.id)].index);
    this.props.history.push("/taggingTool/tag/multi/" + multiToken.index);
  }

  /**
   * function called when clicking on a single word token 
   * It hides the search modal and redirect to the single token clicked
   * @param {token} token the token clicked on in the search modal
   * @function
   */
  handleClickList = token => {
    this.handleDeleteModal();
    this.props.history.push("/taggingTool/tag/single/" + token.index);
  };

  /**
   * function called when clicking on the continue button
   * it checks if a classification has been selected and then redirect 
   * to the next multi token in the list ranked by tf-idf
   * @function
   */
  handleContinue = () => {
    if (this.props.singleTokens[parseInt(this.props.match.params.id)].classification.color === "") {
      this.setState({ showNoClassificationModal: true });
      return null;
    } else {
      this.setState({ showNoClassificationModal: false });
    }
    var tokens = [...this.props.singleTokens];
    var index = tokens.findIndex(element => element.classification.color === "");
    if (index === -1) {
      this.props.history.push("/taggingTool/tag/multi");
    } else {
      this.props.history.push("/taggingTool/tag/single/" + index);
    }
  };


  /**
   * function called when clicked on More button
   * It basically show or hide the modal of all the
   * multi word tokens where the current single word token
   * appeared in
   * @function
   */
  showMoreOrLess = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  /**
   * function that hide the alert message when trying to continue
   * without classification selected
   * @function
   */
  handleHideNoClassificationAlert = () => {
    this.setState({ showNoClassificationModal: false });
  }

  /**
 * function to hide modal of search among between single words
 * @function
 */
  handleDeleteModal = () => {
    this.setState({ showModal: false });
  };

  /**
 * function to show the modal of search among all the single words 
 * @function
 */
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  /**
   * function to hide the alert message when no single tokens
   */
  handleDelete = () => {
    const alert = { ...this.props.alert };
    alert.showAlert = false;
    this.props.onUpdateAlert(alert);
  };

  /** 
   * function to update the the value of the alias of the current single word token
   * @param {event} event the event generated when typing in the alias form field
   * @function
   */
  updateValue = event => {
    var tokens = [...this.props.singleTokens];
    var token = {
      ...this.props.singleTokens[parseInt(this.props.match.params.id)]
    };
    token.alias = event.target.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateSingleTokens(tokens);
  };

  /**
   * function to add a classification to the current single word
   * @param {classificationTag} classificationTag The classification of the single word
   * @function
   */
  handleAddClassification = classificationTag => {
    //classificationTag.style = { borderColor: "black" };
    var tokens = [...this.props.singleTokens];
    var token = {
      ...this.props.singleTokens[parseInt(this.props.match.params.id)]
    };
    token.classification.color = classificationTag.color;
    token.classification.label = classificationTag.shortkey;
    token.classification.value = classificationTag.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateSingleTokens(tokens);
  };

  /**
   * function to toggle the text area of the note of the current single word token
   * @function
   */
  handleToggle = () => {
    var tokens = [...this.props.singleTokens];
    var token = {
      ...this.props.singleTokens[parseInt(this.props.match.params.id)]
    };
    token.note.showNote = !token.note.showNote;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateSingleTokens(tokens);
  };

  /**
   * function to change the texte of the note 
   * @param {event} event event generated automatically when typing in the typing area
   * @function
   */
  handleChangeNote = event => {
    var tokens = [...this.props.singleTokens];
    var token = {
      ...this.props.singleTokens[parseInt(this.props.match.params.id)]
    };
    token.note.value = event.target.value;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateSingleTokens(tokens);
  };
  handleAddNote = () => { };
  handleEditNote = () => { };

  /**
   * function to remove a synonym from the selected synonyms
   * @param {token} synonym the synonym to remove 
   * @function
   */
  handleDeleteSynonym = synonym => {
    var tokens = [...this.props.singleTokens];
    var token = {
      ...this.props.singleTokens[parseInt(this.props.match.params.id)]
    };
    var selectedSynonyms = token.selectedSynonyms.filter(element => {
      return element.value !== synonym.value;
    });
    var synonyms = this.computeSynonyms(token.label);
    var synonymToBeAdded = synonyms.filter(element => {
      return element.label === synonym.value;
    })[0];
    token.synonyms.push(synonymToBeAdded);
    token.selectedSynonyms = selectedSynonyms;
    tokens[parseInt(this.props.match.params.id)] = token;
    this.props.onUpdateSingleTokens(tokens);
  };

  /**
   * function to add a synonym to the selected synonyms
   * @param {token} synonym the synonym to add 
   * @function
   */
  handleSelectSynonym = synonym => {
    var tokens = [...this.props.singleTokens];
    var token = {
      ...this.props.singleTokens[parseInt(this.props.match.params.id)]
    };
    var found = token.selectedSynonyms.find(element => {
      return element.value === synonym.value;
    });
    if (!found) {
      token.selectedSynonyms.push(synonym);
      token.synonyms = token.synonyms.filter(element => {
        return element.label !== synonym.value;
      });
      tokens[parseInt(this.props.match.params.id)] = token;
      this.props.onUpdateSingleTokens(tokens);
    }
  };

  /**
   * function to get and set all the tooltips of the synonyms of the
   * current single Token
   * @function
   */
  refreshSynonyms = () => {
    const indexOfHeaderToTag = this.props.headers.headers.findIndex((header) => header.checked);
    this.props.singleTokens.forEach(element => {
      element.synonyms.forEach((synonym) => {
        synonym.tooltip = [];
        this.props.ex.output.filter((outputLine) => {
          var tmpInputDataParsed = outputLine[indexOfHeaderToTag].toLowerCase().split(" ");
          tmpInputDataParsed.map((token) => {
            if (token === (synonym.label.toLowerCase()) && synonym.tooltip.length < 3) {
              synonym.tooltip.push(outputLine[indexOfHeaderToTag]);
            }
            return true;
          });
          return true;
        })
      });
    });
  }

  /**
   * function to set the synonyms of every single word token 
   * @function 
   */
  computeSynonyms = label => {
    var synonyms = [];
    this.props.singleTokens.forEach(element => {
      if (
        fuzz.ratio(label, element.label) > this.props.pattern &&
        element.label !== label
      ) {
        element.tooltip = ["synonym appeared there"];
        synonyms.push(element);
      }
    });
    return synonyms;
  };

  /**
   * function to init all the singletokens with the appropriate alias,
   * basically their label, and also set the list of multi tokens which are composed by the
   * current single word and another single word token
   * @function
   */
  initTokenWithSynonymAlias(index) {
    var tokens = [...this.props.singleTokens];
    var token = { ...this.props.singleTokens[index] };
    // if the token doesn't have synonyms and it doesn't have any selected synonyms
    if (token.synonyms.length < 1 && token.selectedSynonyms.length === 0) {
      var synonyms = this.computeSynonyms(token.label);
      token.synonyms = synonyms;
      tokens[index] = token;
    }
    if (!token.alias) {
      token.alias = token.label;
    }
    this.props.multiTokens.forEach((multiToken) => {
      var multiTokenSplitted = multiToken.label.split(" ");
      if (token.label === multiTokenSplitted[0] || token.label === multiTokenSplitted[1]) {
        token.appearsIn.push(JSON.parse(JSON.stringify(multiToken)));
      }
    });
    this.setState({ currentMultiTokens: token.appearsIn.slice(0, 3) });
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
  state => state.headers,
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
    multiTokens,
    headers
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
    multiTokens,
    headers
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
