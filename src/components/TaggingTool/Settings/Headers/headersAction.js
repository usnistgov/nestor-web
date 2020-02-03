export const API_REQUEST_ERROR = "headers:showError";
export const GET_HEADERS = "headers:getHeaders";
export const UPDATE_HEADERS = "headers:updateHeaders";

export function showError(error)
{
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: {
      headers: {
        headers: "ERROR",
        emptyColumns: "ERROR"
      }
    }
  };
}
export function updateHeaders(headers, emptyColumns)
{
  return {
    type: UPDATE_HEADERS,
    payload: {
      headers: {
        headers: headers,
        emptyColumns: emptyColumns
      }
    }
  };
}

export function getHeaders(headersList, tooltipList, emptyColumns)
{
  const headers = [];
  headersList.forEach((element, index) =>
  {
    if (element)
    {
      headers.push({
        checked: false,
        label: element,
        tooltip: tooltipList[ index ]
      });
    }
  });
  var filtered = emptyColumns.filter(function (e)
  {
    return e !== "";
  });
  return updateHeaders(headers, filtered);
}
export function headersRequest()
{
  return dispatch =>
  {
    const zerorpc = window.zero;
    let client = new zerorpc.Client();
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("headers", (error, res) =>
    {
      if (error)
      {
        console.log(error);
      } else
      {
        console.log(res);
        console.log(JSON.parse(res));
        var response = JSON.parse(res);
        dispatch(
          getHeaders(response.headers, response.tooltip, response.empty_columns)
        );
      }
    });
  };
}
