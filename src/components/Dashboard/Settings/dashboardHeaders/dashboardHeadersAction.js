
export const UPDATE_DASHBOARD_HEADERS = "dashboard:updateDashboardHeaders";
export const INIT_HEADERS = "dashboard:initHeaders";

export function displayDashboardHeaders(headers) {
    console.log(headers);
    return {
        type: UPDATE_DASHBOARD_HEADERS,
        payload: {
            dashboardSettings: headers
        }
    };
}
export function updateDashboardHeaders(headers) {
    return dispatch => {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");

        client.invoke("updateDashboardHeaders", headers, (error, res) => {
            console.log(res);
            if (error) {
                console.log(error);
            }
            displayDashboardHeaders(res)
        });
    };
}

export function initHeaders(headersList, tooltipList) {
    console.log("initHeaders");
    const dashboardSettings = [];
    headersList.forEach((element, index) => {
        if (element) {
            dashboardSettings.push({
                rowLabel: element,
                checkboxes: [
                    {
                        label: "machineName",
                        checked: false
                    },
                    {
                        label: "technicianName",
                        checked: false
                    },
                    {
                        label: "NA",
                        checked: false
                    }],
                tooltip: tooltipList[index]
            });
        }
    });
    return {
        type: INIT_HEADERS,
        payload: {
            dashboardSettings
        }
    }
}

export function getDashboardHeaders() {
    return dispatch => {
        console.log("getDashboArdeaders");
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        client.invoke("headers", (error, res) => {
            if (error) {
                console.log(error);
            } else {
                var response = JSON.parse(res)
                dispatch(initHeaders(response.headers, response.tooltip));
            }
        })
    }
}