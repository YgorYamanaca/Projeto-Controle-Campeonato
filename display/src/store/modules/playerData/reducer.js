import produce from 'immer';
const initialState = [];
export default function playerData(state = initialState, action)
{
    switch (action.type) {
        case 'ADD_PLAYER_SUCCESS':
            return produce(state, draft => {
                draft.push(action.playerInfo)
            })
        case 'ADD_PLAYERS_DATA':
            return action.playersInfo

        case 'REMOVE_PLAYER_DATA_SUCCESS':
            return produce(state, draft => {
                return draft.filter(player=> player.id_jogador !== action.playerID)
            })
        default:
            return state;
    }
}