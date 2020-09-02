import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addPlayerSuccess } from './actions';
import {removePlayerDataSuccess} from './actions';
import postPlayerData from '../../../services/postPlayerData'
import deletePlayerDate from '../../../services/deletePlayerDate'
function* addPlayer({playerInfo})
{
    const response = yield call(postPlayerData, playerInfo)
    if(response.status === 200)
    { 
        yield put(addPlayerSuccess(playerInfo))
    }
}

function* removePlayer({playerID})
{
    const response = yield call(deletePlayerDate, playerID)
    if(response.status === 200)
    { 
        yield put(removePlayerDataSuccess(playerID))
    }
}

export default all([
    takeLatest('ADD_PLAYER_REQUEST', addPlayer),
    takeLatest("REMOVE_PLAYER_DATA_REQUEST", removePlayer)
])