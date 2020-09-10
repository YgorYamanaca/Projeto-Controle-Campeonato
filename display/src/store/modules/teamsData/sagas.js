import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addTeamSuccess, removeTeamDataSuccess, editDataTeamSuccess } from './actions';
import postTeamData from '../../../services/postTeamData';
import deleteTeamData from '../../../services/deleteTeamData';
import editTeamData from '../../../services/editTeamData';
function* addTeam({teamInfo})
{
    const response = yield call(postTeamData, teamInfo)
    if(response.status === 200)
    { 
        teamInfo.id_time = response.body.id_time;
        yield put(addTeamSuccess(teamInfo))
    }
}

function* removeTeam({teamID})
{
    const response = yield call(deleteTeamData, teamID)
    if(response.status === 200)
    { 
        yield put(removeTeamDataSuccess(teamID))
    }
}

function* editTeam({team, name, nivel})
{
    const response = yield call(editTeamData, team, name, nivel)
    if(response.status === 200)
    { 
        yield put(editDataTeamSuccess(team, name, nivel))
    }
}

export default all([
    takeLatest('ADD_TEAM_REQUEST', addTeam),
    takeLatest('REMOVE_TEAM_DATA_REQUEST', removeTeam),
    takeLatest('EDIT_TEAM_REQUEST', editTeam)
])