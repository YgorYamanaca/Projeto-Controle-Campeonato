export const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS'
export const ADD_TEAM_REQUEST = 'ADD_TEAM_REQUEST'
export const ADD_TEAMS_DATA = 'ADD_TEAMS_DATA'
export const REMOVE_TEAM_DATA_REQUEST = 'REMOVE_TEAM_DATA_REQUEST'
export const REMOVE_TEAM_DATA_SUCCESS = 'REMOVE_TEAM_DATA_SUCCESS'
export const EDIT_TEAM_REQUEST = 'EDIT_TEAM_REQUEST';
export const EDIT_TEAM_SUCCESS = 'EDIT_TEAM_SUCCESS';
export function addTeamSuccess(teamInfo)
{
    return{
        type:ADD_TEAM_SUCCESS,
        teamInfo
    }
}

export function addTeamRequest(teamInfo)
{
    return{
        type:ADD_TEAM_REQUEST,
        teamInfo
    }
}

export function addTeamsData(teamsInfo)
{
    return{
        type:ADD_TEAMS_DATA,
        teamsInfo
    }
}

export function removeTeamDataRequest(teamID)
{
    return{
        type:REMOVE_TEAM_DATA_REQUEST,
        teamID
    }
}

export function removeTeamDataSuccess(teamID)
{
    return{
        type:REMOVE_TEAM_DATA_SUCCESS,
        teamID
    }
}

export function editDataTeamRequest(team, name, nivel)
{
    return{
        type:EDIT_TEAM_REQUEST,
        team,
        name,
        nivel
    }
}

export function editDataTeamSuccess(team, name, nivel)
{
    return{
        type:EDIT_TEAM_SUCCESS,
        team,
        name,
        nivel
    }
}