import React, { Component } from "react";
import text from "../../assets/language/en.js";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { exportOutput } from "../TaggingTool/Export/exportAction";
import PouchDB from "pouchdb";



class SaveComponent extends Component
{

    constructor(props)
    {
        super(props);
    }

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
        alert('saving projerct state');
        // PouchDb : insert or update data
        // Retrieve data for current project
        // download csv, into JSon and then store field
        // OR retrieve data from api vocab, tokens, multitokens 
        // and store it into datastore
        console.log(this.props.ex.multi);
        console.log(this.props.ex.single);
        console.log(this.props.ex.output);
        console.log(this.props.dragAndDrops);
        const multi = this.props.ex.multi;
        const single = this.props.ex.single;
        const output = this.props.ex.output;


        window.db = new PouchDB("testdatabase");
        const projectId = this.props.dragAndDrops[ 0 ].file.name.split(".")[ 0 ];
        window.db.get(projectId).then(function (doc)
        {
            console.log(doc);
            doc.multiToken = multi;
            doc.singleToken = single;
            doc.vocab = output;
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
    (dragAndDrops, ex) => ({
        dragAndDrops,
        ex
    })
);
const mapActionsToProps = {
    onExportOutput: exportOutput
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(SaveComponent);

