import { UPDATE_DASHBOARD_HEADERS, INIT_HEADERS } from "./dashboardHeadersAction";
export default function dashboardHeadersReducer(state = "", { type, payload }) {
    switch (type) {
        case UPDATE_DASHBOARD_HEADERS:
            return payload.dashboardSettings;
        case INIT_HEADERS:
            return payload.dashboardSettings;
        default:
            return state;
    }
}