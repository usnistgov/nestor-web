import { GET_SIMILARITY, UPDATE_SIMILARITY } from "./similarityAction";
export default function similarityReducer(state = "", { type, payload }) {
  switch (type) {
    case GET_SIMILARITY:
      return payload.similarity;
    case UPDATE_SIMILARITY:
        return payload.similarity;
    default:
      return state;
  }
}
