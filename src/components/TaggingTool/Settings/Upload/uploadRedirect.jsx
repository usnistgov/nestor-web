import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

/**
 * Component for the Upload link.
 * 
 * @component
 */
class UploadRedirect extends Component {

  /**
   * The render function.
   */
  render() {
    return (
      <Redirect to='/taggingTool/settings/upload' />
    )
  }
}
export default(UploadRedirect);