export const ADD_PLAYER_SUCCESS = 'ADD_PLAYER_SUCCESS'
export const ADD_PLAYER_REQUEST = 'ADD_PLAYER_REQUEST'
export const ADD_PLAYERS_DATA = 'ADD_PLAYERS_DATA'
export const REMOVE_PLAYER_DATA_REQUEST = 'REMOVE_PLAYER_DATA_REQUEST'
export const REMOVE_PLAYER_DATA_SUCCESS = 'REMOVE_PLAYER_DATA_SUCCESS'
export const EDIT_PLAYER_DATA_REQUEST = 'EDIT_PLAYER_DATA_REQUEST'
export const EDIT_PLAYER_DATA_SUCCESS = 'EDIT_PLAYER_DATA_SUCCESS'

export function addPlayerSuccess(playerInfo)
{
    return{
        type:ADD_PLAYER_SUCCESS,
        playerInfo
    }
}

export function addPlayerRequest(playerInfo, teamData)
{
    return{
        type:ADD_PLAYER_REQUEST,
        playerInfo,
        teamData
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

export function editDataPlayerRequest(player, name, tel, level, position, nick, birth)
{
    return{
        type:EDIT_PLAYER_DATA_REQUEST,
        player,
        name,
        tel,
        level,
        position,
        nick,
        birth
    }
}

export function editPlayerDataSuccess(player, name, tel, level, position, nick, birth)
{
    return{
        type:EDIT_PLAYER_DATA_SUCCESS,
        player,
        name,
        tel,
        level,
        position,
        nick,
        birth
    }
}