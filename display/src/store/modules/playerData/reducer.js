import produce from 'immer';
const initialState = {data:[], userMessage:{message:"", status:""}};

export default function playerData(state = initialState, action)
{
    console.log(action)
    switch (action.type) {
        case 'ADD_PLAYER_SUCCESS':
            return produce(state, draft => {
                draft.data.push(action.playerInfo)
            })
        case 'ADD_PLAYERS_DATA':
            return produce(state, draft=> {
                 draft.data = action.playersInfo;
                 draft.userMessage.status = "Success";
                 draft.userMessage.message = "Dados recebidos com sucesso.";
            })

        case 'REMOVE_PLAYER_DATA_SUCCESS':
            return produce(state, draft => {
                draft.data = draft.data.filter(player=> player.id_jogador !== action.playerID)
            })
        case 'EDIT_PLAYER_DATA_SUCCESS':
        return produce(state, draft => {
            let index = state.data.findIndex(element => element.id_jogador === action.player.id_jogador);
            if(action.name || action.level || action.tel || action.position || action.nick || action.birth)
            {
                draft.data[index].nome = action.name? action.name : action.player.nome
                draft.data[index].telefone = action.tel? action.tel : action.player.telefone
                draft.data[index].Time = action.level? action.level : action.player.Time
                draft.data[index].posicao = action.position? action.position.label : action.player.posicao
                draft.data[index].apelido = action.nick? action.nick : action.player.apelido
                draft.data[index].data_nasc = action.birth? action.birth : action.player.data_nasc
            }
        })
        default:
            return state;
    }
}