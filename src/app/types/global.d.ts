// types/global.d.ts
import { Server as SocketIOServer } from 'socket.io';

declare global {
  var socketio: SocketIOServer | undefined;
}
