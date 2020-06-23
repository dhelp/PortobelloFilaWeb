
import io from "socket.io-client";
//debugger 
// var  reconnection = true,
//     reconnectionDelay = 5000,
//     reconnectionTry = 0;

// export const socket = io('http://localhost:3000',  {
//     secure: true,
//     transports: ['websocket'],
//   })
export const socket = io('https://app-server-fila-gabriel.herokuapp.com/',  {
    secure: true,
    transports: ['websocket'],
  });
