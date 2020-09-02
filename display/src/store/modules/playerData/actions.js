export const ADD_PLAYER_SUCCESS = 'ADD_PLAYER_SUCCESS'
export const ADD_PLAYER_REQUEST = 'ADD_PLAYER_REQUEST'
export const ADD_PLAYERS_DATA = 'ADD_PLAYERS_DATA'
export const REMOVE_PLAYER_DATA_REQUEST = 'REMOVE_PLAYER_DATA_REQUEST'
export const REMOVE_PLAYER_DATA_SUCCESS = 'REMOVE_PLAYER_DATA_SUCCESS'
export function addPlayerSuccess(playerInfo)
{
    return{
        type:ADD_PLAYER_SUCCESS,
        playerInfo
    }
}

export function addPlayerRequest(playerInfo)
{
    return{
        type:ADD_PLAYER_REQUEST,
        playerInfo
    }
}

export function addPlayerData(playersInfo)
{
    return{
        type:ADD_PLAYERS_DATA,
        playersInfo
    }
}

export function removePlayerDataRequest(playerID)
{
    return{
        type:REMOVE_PLAYER_DATA_REQUEST,
        playerID
    }
}

export function removePlayerDataSuccess(playerID)
{
    return{
        type:REMOVE_PLAYER_DATA_SUCCESS,
        playerID
    }
}
