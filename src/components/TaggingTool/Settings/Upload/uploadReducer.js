import { UPDATE_FILE_BOX } from "./uploadAction.js";
import { INIT_FILE_BOX } from "./uploadAction.js";
import { UPLOAD_FILE } from "./uploadAction.js";
export default function uploadReducer(state = "", { type, payload }) {
  switch (type) {
    case UPDATE_FILE_BOX:
      return payload.dragAndDrops;
    case INIT_FILE_BOX:
      return payload.dragAndDrops;
    case UPLOAD_FILE:
      return payload.dragAndDrops;
    default:
      return state;
  }
}
