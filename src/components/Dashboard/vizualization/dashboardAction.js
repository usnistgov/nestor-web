export const SET_ASSETS_STATS = "dashboard:setAssetsStats";
export const SET_SELECTED_ASSET = "dashboard:setSelectedAsset";
export const SET_SELECTED_PROBLEM = "dashboard:setProblemSelected";

export function getAssetsStats(oldAssetSelected) {
    return dispatch => {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        client.invoke("getAssetsStats", (error, res) => {
            if (error) {
                console.log(error);
            } else {
                dispatch(setAssetsStats(res, oldAssetSelected));
            }
        });
    }
}
function setAssetsStats(assetsStats, oldAssetSelected) {
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
                assetSelected: oldAssetSelected
            }
        }
    }
}
export function getAssetSelected(oldAssetsStats, headers, assetName, problemsRelated) {
    return dispatch => {
        const zerorpc = window.zero;
        let client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        client.invoke("getAssetSelected", headers, assetName, (error, res) => {
            if (error) {
                console.log(error);
            } else {
                dispatch(setAssetSelected(oldAssetsStats, assetName, problemsRelated, res));
            }
        });
    }
}
export function setAssetSelected(oldAssetsStats, assetName, problemsRelated, mostFoundWords) {
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
                },
                assetsStats: oldAssetsStats
            }
        }
    }
}