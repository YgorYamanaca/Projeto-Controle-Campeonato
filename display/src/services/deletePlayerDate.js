import {serverIP, serverPort} from '../config/config.js'

export default async (playerID) => {
  const response = await fetch(`http://${serverIP}:${serverPort}/jogador`,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({id_jogador:playerID})});
  return response;
}