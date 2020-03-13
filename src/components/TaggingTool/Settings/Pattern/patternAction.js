export const API_REQUEST_ERROR = "pattern:showError";
export const GET_PATTERN = "pattern:getPattern";
export const UPDATE_PATTERN = "pattern:updatePattern";

export function showError(error)
{
  console.log(error);
  return {
    type: API_REQUEST_ERROR,
    payload: { pattern: "ERROR" }
  };
}
export function updatePattern(pattern)
{
  return {
    type: UPDATE_PATTERN,
    payload: {
      pattern: pattern
    }
  };
}
export function getPattern(pattern)
{
  return updatePattern(pattern);
}
