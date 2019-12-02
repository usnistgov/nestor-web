import { GET_HEADERS, UPDATE_HEADERS } from "./headersAction";
export default function headersReducer(state = "", { type, payload }) {
  switch (type) {
    case GET_HEADERS:
      return payload.headers;
    case UPDATE_HEADERS:
        return payload.headers;
    default:
      return state;
  }
}
