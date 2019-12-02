import {
  GET_TOKENS_NUMBER,
  UPDATE_SINGLE_TOKENS_NUMBER,
  INIT_TOKENS_NUMBER
} from "./tokensNumberAction";
export default function tokensReducer(state = "", { type, payload }) {
  switch (type) {
    case GET_TOKENS_NUMBER:
      return payload.tokensNumber;
    case UPDATE_SINGLE_TOKENS_NUMBER:
      return payload.tokensNumber;
    case INIT_TOKENS_NUMBER:
      return payload.tokensNumber;
    default:
      return state;
  }
}
