export const ADD_CHAMPIONSHIP_REQUEST = 'ADD_CHAMPIONSHIP_REQUEST'
export const ADD_CHAMPIONSHIP_SUCCESS = 'ADD_CHAMPIONSHIP_SUCCESS'
export const ADD_MULTICHAMPIONSHIP = 'ADD_MULTICHAMPIONSHIP'


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

