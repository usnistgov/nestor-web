import { GET_COMPLETENESS, INIT_REPORT } from "./reportAction";
export default function reportReducer(state = "", { type, payload }) {
  switch (type) {
    case GET_COMPLETENESS:
      return payload.report;
    case INIT_REPORT:
      return payload.report;
    default:
      return state;
  }
}
