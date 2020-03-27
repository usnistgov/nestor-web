export const API_REQUEST_ERROR = "upload:showError";
export const UPDATE_FILE_BOX = "upload:updateFileBox";
export const INIT_FILE_BOX = "upload:initFileBox";
export const UPLOAD_FILE = "upload:uploadFile";

export function showError(error)
{
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { headers: "ERROR" }
  };
}
export function initFileBox()
{
  return {
    type: INIT_FILE_BOX,
    payload: {
      dragAndDrops: [
        {
          id: 1,
          file: {},
          dragged: false,
          dropped: false,
          projectName: ''
        } /*,
        {
          id: 2,
          file: false,
          dragged: false,
          dropped: false
        }*/
      ]
    }
  };
}
export function updateFileBox(dragAndDrops)
{
  return {
    type: UPDATE_FILE_BOX,
    payload: {
      dragAndDrops: dragAndDrops
    }
  };
}
export function uploadFile(file)
{
  return dispatch =>
  {
    const zerorpc = window.zero;
    let client = new zerorpc.Client();
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("upload", file, (error, res) =>
    {
      if (error)
      {
        console.log(error);
      }
    });
  };
}
