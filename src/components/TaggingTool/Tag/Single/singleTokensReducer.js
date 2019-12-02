import { UPDATE_SINGLE_TOKENS, UPDATE_SINGLE_TOKEN } from "./singleTokensAction";
export default function singleTokensReducer(state = "", { type, payload }) {
  switch (type) {
    case UPDATE_SINGLE_TOKENS:
      return payload.singleTokens;
    case UPDATE_SINGLE_TOKEN:
        return payload.singleTokens;
    default:
      return state;
  }
}