export const API_REQUEST_ERROR = "home:showError";
export const GET_HOME = "home:getHome";
export const UPDATE_HOME = "home:updateHome";

export function showError(error)
{
    console.log(error);
    return {
        type: API_REQUEST_ERROR,
        payload: {
            home: {
                headers: "ERROR",
                emptyColumns: "ERROR"
            }
        }
    };
}

export function openProject(json_string, headers)
{

    return dispatch =>
    {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        client.invoke("uploadJSON", json_string, headers, (error, res) =>
        {
            if (error)
            {
                console.log(error);
            }
        });
    };
}

export function clearAllAttributes()
{

    return dispatch =>
    {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        client.invoke("clearAllAttributes", (error, res) =>
        {
            if (error)
            {
                console.log(error);
            }
        });
    };
}
