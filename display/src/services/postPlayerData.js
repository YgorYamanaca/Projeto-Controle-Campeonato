import {serverIP, serverPort} from '../config/config.js'

export default async (playerData) => {
  const response = await fetch(`http://${serverIP}:${serverPort}/jogador`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(playerData)}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
  return response;
}