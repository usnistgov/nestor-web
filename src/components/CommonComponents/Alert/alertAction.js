export const UPDATE_ALERT = "alert:updateAlert";

export function updateAlert(alert) {
    return {
      type: UPDATE_ALERT,
      payload: {
        alert: alert
      }
    };
}