export const API_REQUEST_ERROR = "singleTokens:showError";
export const SET_TOKENS = "singleTokens:setTokens";
export const UPDATE_SINGLE_TOKENS = "singleTokens:updateSingleTokens";
export const UPDATE_VOCAB = "singleTokens:updateSingleVocab";
export const UPDATE_SINGLE_TOKEN = "singleTokens:updateSingleToken";

export function showError(error)
{
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { singleTokens: "ERROR" }
  };
}
export function updateSingleToken(tokens)
{
  return {
    type: UPDATE_SINGLE_TOKEN,
    payload: {
      singleTokens: tokens
    }
  };
}
export function updateSingleTokens(tokens)
{
  return {
    type: UPDATE_SINGLE_TOKENS,
    payload: {
      singleTokens: tokens
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
  return updateSingleTokens(tokens);

}
export function singleTokensRequest(headers)
{
  return dispatch =>
  {
    const zerorpc = window.zero;
    let client = new zerorpc.Client({ timeout: 60, heartbeatInterval: 60000 });
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("single_tokens", headers, (error, res) =>
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
      } else
      {
        console.log(res);
      }
    });
  };
}
