export const ADD_PLAYER_SUCCESS = 'ADD_PLAYER_SUCCESS'
export const ADD_PLAYER_REQUEST = 'ADD_PLAYER_REQUEST'
export const ADD_PLAYERS_DATA = 'ADD_PLAYERS_DATA'

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