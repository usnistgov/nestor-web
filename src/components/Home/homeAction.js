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

export function openProject(json_string)
{

    return dispatch =>
    {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        console.log('openProject()');
        console.log(json_string);
        client.connect("tcp://127.0.0.1:4242");

        client.invoke("uploadJSON", json_string, (error, res) =>
        {
            console.log("wiaiting");
            if (error)
            {
                console.log(error);
            } else
            {
                console.log(res);
                console.log(JSON.parse(res));
            }
        });
    };
}