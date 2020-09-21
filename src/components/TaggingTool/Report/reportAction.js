export const API_REQUEST_ERROR = "report:showError";
export const GET_COMPLETENESS = "report:getCompleteness";
export const INIT_REPORT = "report:initReport";

export function showError(error)
{
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { report: "ERROR" }
  };
}
export function initReport()
{
  return {
    type: INIT_REPORT,
    payload: {
      report: {
        complete: 0,
        empty: 0,
        total: 0,
        ppv: [],
        tagged: 0,
        taggedWords: 0
      }
    }
  };
}
export function updateReport(res)
{
  return {
    type: GET_COMPLETENESS,
    payload: {
      report: {
        complete: res[ 0 ],
        empty: res[ 1 ],
        total: res[ 2 ].length,
        ppv: res[ 2 ],
        tagged: res[ 3 ] - 1,
        taggedWords: res[ 4 ]
      }
    }
  };
}
export function getCompleteness()
{
  return dispatch =>
  {
    const zerorpc = window.zero;
    let client = new zerorpc.Client({ timeout: 60, heartbeatInterval: 60000 });
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("completeness", (error, res) =>
    {
      if (error)
      {
        console.log(error);
      } else
      {
        dispatch(updateReport(res));
      }
    });
  };
}
