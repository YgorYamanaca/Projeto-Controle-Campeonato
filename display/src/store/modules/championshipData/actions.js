export const ADD_CHAMPIONSHIP_REQUEST = 'ADD_CHAMPIONSHIP_REQUEST'
export const ADD_CHAMPIONSHIP_SUCCESS = 'ADD_CHAMPIONSHIP_SUCCESS'
export const ADD_MULTICHAMPIONSHIP = 'ADD_MULTICHAMPIONSHIP'
export const EDIT_CHAMPIONSHIP_REQUEST = 'EDIT_CHAMPIONSHIP_REQUEST'
export const EDIT_CHAMPIONSHIP_SUCCESS = 'EDIT_CHAMPIONSHIP_SUCCESS'

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

export function editChampionShipRequest(row, nome, inicio, fim)
{
    return{
        type:EDIT_CHAMPIONSHIP_REQUEST, row, nome, inicio, fim
    }
}

export function editChampionShipSuccess(championShip)
{
    return{
        type:EDIT_CHAMPIONSHIP_SUCCESS, championShip
    }
}