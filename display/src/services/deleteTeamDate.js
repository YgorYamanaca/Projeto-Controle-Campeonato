import {serverIP, serverPort} from '../config/config.js'

export default async (teamID) => {
  const response = await fetch(`http://${serverIP}:${serverPort}/time`,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({id_time:teamID})});
  return response;
}