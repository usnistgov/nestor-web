import React, { Component } from "react";
import text from "../../assets/language/en.js";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { exportOutput } from "../TaggingTool/Export/exportAction";



class SaveComponent extends Component
{
    componentDidMount()
    {
        this.props.onExportOutput();
    }

    render()
    {
        return (
            <div className="home-container">
                <div className="title">{ text.save.header }</div>
                <InputGroup className="mb-3">
                    Your project has been successfully saved
                </InputGroup>
            </div>
        );
    }





}

const mapStateToProps = createSelector(
    state => state.dragAndDrops,
    state => state.export,
    state => state.singleTokens,
    state => state.tokensNumber,
    (dragAndDrops, ex, singleTokens, tokensNumber,
    ) => ({
        dragAndDrops,
        ex,
        singleTokens,
        tokensNumber,
    })
);
const mapActionsToProps = {
    onExportOutput: exportOutput
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(SaveComponent);

