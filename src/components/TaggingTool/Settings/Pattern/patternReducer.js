import { GET_PATTERN, UPDATE_PATTERN } from "./patternAction";
export default function patternReducer(state = "", { type, payload }) {
  switch (type) {
    case GET_PATTERN:
      return payload.pattern;
    case UPDATE_PATTERN:
        return payload.pattern;
    default:
      return state;
  }
}
