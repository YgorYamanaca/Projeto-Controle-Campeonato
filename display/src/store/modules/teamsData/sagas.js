import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addTeamSuccess, removeTeamDataSuccess } from './actions';
import postTeamData from '../../../services/postTeamData';
import deleteTeamDate from '../../../services/deleteTeamDate';

function* addTeam({teamInfo})
{
    const response = yield call(postTeamData, teamInfo)
    if(response.status === 200)
    { 
        yield put(addTeamSuccess(teamInfo))
    }
}

function* removeTeam({teamID})
{
    const response = yield call(deleteTeamDate, teamID)
    if(response.status === 200)
    { 
        yield put(removeTeamDataSuccess(teamID))
    }
}

export default all([
    takeLatest('ADD_TEAM_REQUEST', addTeam),
    takeLatest("REMOVE_TEAM_DATA_REQUEST", removeTeam)
])