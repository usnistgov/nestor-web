export const API_REQUEST_ERROR = "classification:showError";
export const SET_CLASSIFICATION = "classification:setClassification";
export const UPDATE_CLASSIFICATION = "classification:updateClassification";

export function showError(error) {
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { classification: "ERROR" }
  };
}
export function updateClassification(types, rules) {
  return {
    type: UPDATE_CLASSIFICATION,
    payload: {
      classification: {
        types: types,
        rules: rules
      }
    }
  };
}
export function setClassification(t, r) {
  const types = [];
  const rules = [];
  const typesColors = ["#FFBA5C", "#00A6FF", "#77D353", "#976DD0", "#228B22"];
  const rulesColors = ["#8E7F28", "#8E2837"];
  Object.entries(t).forEach(function(obj, i) {
    types.push({
      shortkey: obj[0],
      label: obj[1],
      color: typesColors[i]
    });
  });
  Object.entries(r).forEach(function(obj, i) {
    rules.push({
      shortkey: obj[0],
      label: obj[1],
      color: rulesColors[i]
    });
  });
  return updateClassification(types, rules);
}
export function classificationRequest() {
  return dispatch => {
    const zerorpc = window.zero;
    let client = new zerorpc.Client({ timeout: 60, heartbeatInterval: 60000 });
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("classification", (error, res) => {
      if (error) {
        console.log(error);
      } else {
        dispatch(
          setClassification(
            res.entities.types.atomic,
            res.entities.types.derived
          )
        );
      }
    });
  };
}
