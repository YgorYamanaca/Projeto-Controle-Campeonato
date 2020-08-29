import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addPlayerSuccess } from './actions';
import postPlayerData from '../../../services/postPlayerData'

function* addPlayer({playerInfo})
{
    const response = yield call(postPlayerData, playerInfo)
    if(response.status === 200)
    { 
        yield put(addPlayerSuccess(playerInfo))
    }
}

export default all([
    takeLatest('ADD_PLAYER_REQUEST', addPlayer)
])