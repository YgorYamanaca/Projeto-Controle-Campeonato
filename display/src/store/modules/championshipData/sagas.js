import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addChampionshipSuccess } from './actions';
import postChampionshipData from '../../../services/postChampionshipData'
function* addChampionship({championshipInfo})
{
    const response = yield call(postChampionshipData, championshipInfo)
    if(response.status === 200)
    { 
        yield put(addChampionshipSuccess(response.body))
    }
}
export default all([
    takeLatest('ADD_CHAMPIONSHIP_REQUEST', addChampionship)
])