import { UPDATE_MULTI_TOKENS, UPDATE_MULTI_TOKEN } from "./multiTokensAction";
export default function multiTokensReducer(state = "", { type, payload }) {
  switch (type) {
    case UPDATE_MULTI_TOKENS:
      return payload.multiTokens;
    case UPDATE_MULTI_TOKEN:
        return payload.multiTokens;
    default:
      return state;
  }
}