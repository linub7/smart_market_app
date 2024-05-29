import { io } from 'socket.io-client';

const socket = io('http://10.0.2.2:5000', {
  path: '/socket-message',
  autoConnect: false,
});

export default socket;
