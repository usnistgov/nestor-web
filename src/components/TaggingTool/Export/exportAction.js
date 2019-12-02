export const API_REQUEST_ERROR = "export:showError";
export const EXPORT_OUTPUT = "export:exportOutput";

export function showError(error) {
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { export: "ERROR" }
  };
}
export function setExportOutput(output, single, multi) {
  return {
    type: EXPORT_OUTPUT,
    payload: {
      export: {
        output: output,
        single: single,
        multi: multi
      }
    }
  };
}
export function exportOutput() {
  return dispatch => {
    const zerorpc = window.zero;
    let client = new zerorpc.Client({ timeout: 60, heartbeatInterval: 60000 });
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("export", (error, res) => {
      if (error) {
        console.log(error);
      } else {
        var output = JSON.parse(res[1]);
        output.unshift(res[0]);

        var single = JSON.parse(res[3]);
        single.unshift(res[2]);

        var multi = JSON.parse(res[5]);
        multi.unshift(res[4]);

        dispatch(setExportOutput(output, single, multi));
      }
    });
  };
}
