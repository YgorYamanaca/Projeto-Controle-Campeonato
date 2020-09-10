import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addChampionshipSuccess} from './actions';
import {removeChampionshipDataSuccess} from './actions';
import postChampionshipData from '../../../services/postChampionshipData'
import deleteChampionshipdata from '../../../services/deleteChampionshipData'

function* addChampionship({championshipInfo})
{
    const response = yield call(postChampionshipData, championshipInfo)
    if(response.status === 200)
    { 
        yield put(addChampionshipSuccess(response.body))
    }
}
function* removeChampionship({ChampionshipID})
{
    const response = yield call(deleteChampionshipdata, ChampionshipID)
    if(response.status === 200)
    { 
        console.log(ChampionshipID)
        yield put(removeChampionshipDataSuccess(ChampionshipID))
    }
}

export default all([
    takeLatest('ADD_CHAMPIONSHIP_REQUEST', addChampionship),
    takeLatest('REMOVE_CHAMPIONSHIP_DATA_REQUEST', removeChampionship)
])