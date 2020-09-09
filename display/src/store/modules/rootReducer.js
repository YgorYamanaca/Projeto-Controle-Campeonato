import { combineReducers } from 'redux';
import playerData from './playerData/reducer';
import teamsData from './teamsData/reducer' ;
import championshipData from './championshipData/reducer';
export default combineReducers({
    playerData,
    teamsData,
    championshipData,
})