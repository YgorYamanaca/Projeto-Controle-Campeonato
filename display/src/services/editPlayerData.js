import {serverIP, serverPort} from '../config/config.js'

export default async (player, name, tel, level, position, nick, birth) => {
  let day = birth? birth.getDate() : null;
  let month = birth?birth.getMonth() : null;
  let year = birth?birth.getFullYear() : null;
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
        id_time: level? level.id_time : player.Time.id_time,
        posicao: position? position.label : player.posicao,
        apelido: nick? nick : player.apelido,
        data_nasc: birth? new Date(year, month - 1, day) : player.data_nasc
    })}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
  return response;
}
