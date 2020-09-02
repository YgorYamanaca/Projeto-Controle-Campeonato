import produce from 'immer';
const initialState = [];
export default function teamsData(state = initialState, action)
{
    switch (action.type) {
        case 'ADD_TEAM_SUCCESS':
            return produce(state, draft => {
                draft.push(action.teamInfo)
            })
        case 'ADD_TEAMS_DATA':
            return action.teamsInfo
        case 'REMOVE_TEAM_DATA_SUCCESS':
            return produce(state, draft => {
                return draft.filter(team=> team.id_time !== action.teamID)
            })
        default:
            return state;
    }
}