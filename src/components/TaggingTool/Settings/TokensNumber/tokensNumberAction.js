export const API_REQUEST_ERROR = "tokensNumber:showError";
export const GET_TOKENS_NUMBER = "tokensNumber:getTokensNumber";
export const UPDATE_SINGLE_TOKENS_NUMBER =
  "tokensNumber:updateSingleTokensNumber";
export const INIT_TOKENS_NUMBER = "tokensNumber:initTokensNumber";

export function showError(error) {
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { singleTokensNumber: "ERROR" }
  };
}
export function initTokensNumber() {
  return {
    type: INIT_TOKENS_NUMBER,
    payload: {
      tokensNumber: {
        value: 0,
        maxValue: 1
      }
    }
  };
}
export function updateSingleTokensNumber(tokensNumber) {
  return {
    type: UPDATE_SINGLE_TOKENS_NUMBER,
    payload: {
      tokensNumber: tokensNumber
    }
  };
}
export function getTokensNumber(number) {
  const tokensNumber = {
    value: Math.round(number / 2),
    maxValue: number
  };
  return updateSingleTokensNumber(tokensNumber);
}
export function tokensNumberRequest(headers) {
  return dispatch => {
    const zerorpc = window.zero;
    let client = new zerorpc.Client(); //{ timeout: 60, heartbeatInterval: 60000 }
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("single_tokens", headers, (error, res) => {
      if (error) {
        console.log(error);
      } else {
        dispatch(getTokensNumber(res.length));
      }
    });
  };
}
