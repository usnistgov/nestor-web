import { EXPORT_OUTPUT } from "./exportAction";
export default function exportReducer(state = "", { type, payload }) {
  switch (type) {
    case EXPORT_OUTPUT:
      return payload.export;
    default:
      return state;
  }
}
