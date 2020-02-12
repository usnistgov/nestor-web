import React, { Component } from "react";
import Button from "../CommonComponents/Button/button";
import text from "../../assets/language/en.js";




class SaveComponent extends Component
{

    render()
    {
        return (
            <div className="home-container">
                <div className="title">{ text.save.header }</div>
                <div className="button text-center">
                    <Button
                        onClick={ this.handleSaveProject }
                        class="btn btn-primary ctn"
                        label="Save"
                    />
                </div>
            </div>
        );
    }




    handleSaveProject = history =>
    {
        alert('saving projerct state');
        // PouchDb : insert or update data
    };

}
export default SaveComponent;
