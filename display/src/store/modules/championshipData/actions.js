export const ADD_CHAMPIONSHIP_REQUEST = 'ADD_CHAMPIONSHIP_REQUEST'
export const ADD_CHAMPIONSHIP_SUCCESS = 'ADD_CHAMPIONSHIP_SUCCESS'
export const ADD_MULTICHAMPIONSHIP = 'ADD_MULTICHAMPIONSHIP'
export const REMOVE_CHAMPIONSHIP_DATA_REQUEST = 'REMOVE_CHAMPIONSHIP_DATA_REQUEST'
export const REMOVE_CHAMPIONSHIP_DATA_SUCCESS = 'REMOVE_CHAMPIONSHIP_DATA_SUCCESS'

export function addChampionshipRequest(championshipInfo){
    return{
        type:ADD_CHAMPIONSHIP_REQUEST, championshipInfo
    }
}
export function addChampionshipSuccess(championshipInfo){
    return{
        type:ADD_CHAMPIONSHIP_SUCCESS, championshipInfo
    }
}
export function addMultiChampionship(championshipInfos){
    return{
        type:ADD_MULTICHAMPIONSHIP, championshipInfos
    }
}
export function removeChampionshipDataRequest(championshipInfosID)
{
    return{
        type:REMOVE_CHAMPIONSHIP_DATA_REQUEST,
        championshipInfosID
    }
}

export function removeChampionshipDataSuccess(championshipInfosID)
{
    return{
        type:REMOVE_CHAMPIONSHIP_DATA_SUCCESS,
        championshipInfosID
    }
}
