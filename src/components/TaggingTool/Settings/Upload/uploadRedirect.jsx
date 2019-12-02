import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

class UploadRedirect extends Component {
  render() {
    return (
      <Redirect to='/taggingTool/settings/upload' />
    )
  }
}
export default(UploadRedirect);