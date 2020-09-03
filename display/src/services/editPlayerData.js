import {serverIP, serverPort} from '../config/config.js'

export default async (player, name, tel, level, position, nick, birth) => {
  const response = await fetch(`http://${serverIP}:${serverPort}/jogador/`,{
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        id_jogador:player.id_jogador,
        nome:name? name : player.nome,
        telefone:tel? tel : player.telefone,
        id_time: level? level : player.Time.id_time,
        position: position? position : player.position,
        apelido: nick? nick : player.apelido,
        data_nasc: birth? birth : player.data_nasc
    })}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
  return response;
}