import { SET_CLASSIFICATION, UPDATE_CLASSIFICATION } from "./classificationAction";
export default function classificationReducer(state = "", { type, payload }) {
  switch (type) {
    case SET_CLASSIFICATION:
      return payload.classification;
    case UPDATE_CLASSIFICATION:
        return payload.classification;
    default:
      return state;
  }
}
