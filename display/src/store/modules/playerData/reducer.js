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
        case 'EDIT_PLAYER_DATA_SUCCESS':
        return produce(state, draft => {
            let index = state.findIndex(element => element.id_jogador === action.player.id_jogador);
            if(action.name || action.level || action.tel || action.position || action.nick || action.birth)
            {
                draft[index].nome = action.name? action.name : action.player.nome
                draft[index].telefone = action.tel? action.tel : action.player.telefone
                draft[index].Time = action.level? action.level : action.player.Time
                draft[index].posicao = action.position? action.position.label : action.player.posicao
                draft[index].apelido = action.nick? action.nick : action.player.apelido
                draft[index].data_nasc = action.birth? action.birth : action.player.data_nasc
            }
        })
        default:
            return state;
    }
}