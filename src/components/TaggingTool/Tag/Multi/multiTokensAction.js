export const API_REQUEST_ERROR = "multiTokens:showError";
export const SET_TOKENS = "multiTokens:setTokens";
export const UPDATE_MULTI_TOKENS = "multiTokens:updateMultiTokens";
export const UPDATE_VOCAB = "multiTokens:updateMultiVocab";
export const UPDATE_MULTI_TOKEN = "multiTokens:updateMultiToken";

export function showError(error)
{
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { multiTokens: "ERROR" }
  };
}
export function updateMultiToken(tokens)
{
  return {
    type: UPDATE_MULTI_TOKEN,
    payload: {
      multiTokens: tokens
    }
  };
}
export function updateMultiTokens(tokens)
{
  return {
    type: UPDATE_MULTI_TOKENS,
    payload: {
      multiTokens: tokens
    }
  };
}
export function setTokens(tokensList)
{
  const tokens = [];
  tokensList.forEach((element, index) =>
  {
    tokens.push({
      index: index,
      label: element,
      alias: "",
      classification: { color: "", label: "", value: "" },
      synonyms: [],
      selectedSynonyms: [],
      aliasInput: "",
      note: { value: "", showNote: false }
    });
  });
  return updateMultiTokens(tokens);
}
export function multiTokensRequest(headers)
{
  return dispatch =>
  {
    const zerorpc = window.zero;
    let client = new zerorpc.Client({ timeout: 60, heartbeatInterval: 60000 });
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("multi_tokens", headers, (error, res) =>
    {
      if (error)
      {
        console.log(error);
      } else
      {
        dispatch(setTokens(res));
      }
    });
  };
}

export function updateVocab(token)
{
  return dispatch =>
  {
    const zerorpc = window.zero;
    let client = new zerorpc.Client({ timeout: 60, heartbeatInterval: 60000 });
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("update_data", token, (error, res) =>
    {
      if (error)
      {
        console.log(error);
      }
    });
  };
}
