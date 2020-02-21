import React, { Component } from "react";
import text from "../../assets/language/en.js";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { exportOutput } from "../TaggingTool/Export/exportAction";
import PouchDB from "pouchdb";



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
                    <FormControl
                        placeholder="Name of the project you want to store"
                        aria-label="Name of the project you want to store"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button onClick={ this.handleSaveProject } variant="outline-secondary">Save</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }




    handleSaveProject = history =>
    {

        const multi = this.props.ex.multi;
        const single = this.props.ex.single;
        const output = this.props.ex.output;
        const singleTokens = this.props.singleTokens;
        window.db = new PouchDB("testdatabase");
        const projectId = this.props.dragAndDrops[ 0 ].file.name.split(".")[ 0 ];
        window.db.get(projectId).then(function (doc)
        {
            console.log(doc);
            doc.multiToken = multi;
            doc.singleToken = single;
            doc.vocab = output;
            doc.singleTokens = JSON.parse(JSON.stringify(singleTokens));
            return window.db.put(doc);

        }).catch(function (err)
        {
            console.log(err);
            console.log('No data entered at the beginning');
        }).then(function ()
        {
            return window.db.get(projectId);
        }).then(function (doc)
        {
            console.log(doc);
        });
    };
}

const mapStateToProps = createSelector(
    state => state.dragAndDrops,
    state => state.export,
    state => state.singleTokens,
    (dragAndDrops, ex, singleTokens) => ({
        dragAndDrops,
        ex,
        singleTokens
    })
);
const mapActionsToProps = {
    onExportOutput: exportOutput
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(SaveComponent);

