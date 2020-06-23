export const SET_ASSETS_STATS = "dashboard:setAssetsStats";
export const SET_SELECTED_ASSET = "dashboard:setSelectedAsset";

export function getAssetsStats() {
    return dispatch => {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        client.invoke("getAssetsStats", (error, res) => {
            if (error) {
                console.log(error);
            } else {
                dispatch(setAssetsStats(res));
            }
        });
    }
}
function setAssetsStats(assetsStats) {
    const assetsStatsFormatted = [];
    assetsStats.forEach(assetStat => {
        assetsStatsFormatted.push({
            asset: assetStat[0],
            problemsRelated: assetStat[1]
        });
    });
    return {
        type: SET_ASSETS_STATS,
        payload: {
            dashboard: {
                assetsStats: assetsStatsFormatted,
                assetSelected: {
                    label: '',
                    mostFoundItems: [],
                    mostFoundSolutions: [],
                    mostFoundProblems: [],
                    problemsRelated: ''
                }
            }
        }
    }
}
export function getAssetSelected(headers, assetName, problemsRelated) {
    return dispatch => {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        client.invoke("getAssetSelected", headers, assetName, (error, res) => {
            if (error) {
                console.log(error);
            } else {
                dispatch(setAssetSelected(assetName, problemsRelated, res));
            }
        });
    }
}
function setAssetSelected(assetName, problemsRelated, mostFoundWords) {
    var mostFoundItems = [];
    var mostFoundProblems = [];
    var mostFoundSolutions = [];
    var tmp = JSON.parse(mostFoundWords);
    tmp.problems.forEach(element => {
        mostFoundProblems.push({
            token: element[0],
            value: (parseFloat(element[1]))
        });
    });
    tmp.solutions.forEach(element => {
        mostFoundSolutions.push({
            token: element[0],
            value: (parseFloat(element[1]))
        })
    });
    tmp.items.forEach(element => {
        mostFoundItems.push({
            token: element[0],
            value: (parseFloat(element[1]))
        })
    });
    return {
        type: SET_SELECTED_ASSET,
        payload: {
            dashboard: {
                assetSelected: {
                    label: assetName,
                    problemsRelated: problemsRelated,
                    mostFoundItems: mostFoundItems,
                    mostFoundProblems: mostFoundProblems,
                    mostFoundSolutions: mostFoundSolutions
                }
            }
        }
    }
}