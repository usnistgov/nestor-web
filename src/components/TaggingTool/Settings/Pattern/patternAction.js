export const API_REQUEST_ERROR = "pattern:showError";
export const GET_PATTERN = "pattern:getPattern";
export const UPDATE_PATTERN = "pattern:updatePattern";

export function showError(error) {
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { pattern: "ERROR" }
  };
}
export function updatePattern(pattern) {
    return {
        type: UPDATE_PATTERN,
        payload: {
            pattern: pattern
        }
      };
}
export function getPattern(pattern) {
  return updatePattern(pattern);
}
/*
export function patternRequest() {
    return dispatch => {
          const zerorpc = window.zero;
          let client = new zerorpc.Client();
          client.connect("tcp://127.0.0.1:4242");
      
          client.invoke("similarity", (error, res) => {
            if (error) {
              console.log(error);
            } else {
              var response = JSON.parse(res);
              dispatch(getSimilarity(response));
            }
          });
  }
}*/
