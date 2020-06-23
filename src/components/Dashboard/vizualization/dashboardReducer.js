import { SET_ASSETS_STATS, SET_SELECTED_ASSET } from "./dashboardAction";
export default function dashboardReducer(state = "", { type, payload }) {
  switch (type) {
    case SET_ASSETS_STATS:
      return payload.dashboard;
    case SET_SELECTED_ASSET:
      return payload.dashboard;
    default:
      return state;
  }
}