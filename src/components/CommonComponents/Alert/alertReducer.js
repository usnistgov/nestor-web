import { UPDATE_ALERT } from "./alertAction.js";
export default function uploadReducer(state = "", { type, payload }) {
  switch (type) {
    case UPDATE_ALERT:
        return payload.alert;
    default:
      return state;
  }
}
