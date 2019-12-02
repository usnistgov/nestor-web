export const API_REQUEST_ERROR = "similarity:showError";
export const GET_SIMILARITY = "similarity:getSimilarity";
export const UPDATE_SIMILARITY = "similarity:updateSimilarity";

export function showError(error) {
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { similarity: "ERROR" }
  };
}
export function updateSimilarity(similarity) {
    return {
        type: UPDATE_SIMILARITY,
        payload: {
            similarity: similarity
        }
      };
}
export function getSimilarity(similarity) {
  return updateSimilarity(similarity);
}
/*
export function similarityRequest() {
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
