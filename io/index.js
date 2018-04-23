const socketIO = require('socket.io');
const logger = require('../configs/logger');
const { reply } = require('./helpers');

const io = socketIO();

const routeActionToFile = (action, folder, client) => {
  const actionInCamel = action.type
    .split('_IO_')[1]
    .toLowerCase()
    .replace(/_\w/g, str => str[1].toUpperCase());

  // eslint-disable-next-line
  const reducerFile = require(`./${folder}/${actionInCamel}`);
  if (!reducerFile) {
    return;
  }
  reducerFile(client, action, io);
};

const handleSocketAction = client => {
  client.on('action', action => {
    logger.socket.onAction(client, action);
    if (action.type && action.type.split('_IO_').length > 1) {
      const actionType = action.type.split('_IO_');
      if (actionType[0] === 'H') {
        routeActionToFile(action, 'hotelActions', client, io);
      } else if (actionType[0] === 'C') {
        routeActionToFile(action, 'customerActions', client, io);
      }
    }
  });
};

const handleSocketDisconnect = socket => {
  logger.socket.onDisconnect(socket);
};

const handleSocketConnection = socket => {
  logger.socket.onConnection(socket);
  reply(socket, {
    type: 'SOCKET_CONNECTION_ESTABLISHED',
    socketId: socket.id,
  });
  handleSocketAction(socket);
  socket.on('disconnect', handleSocketDisconnect.bind(null, socket.id));
};

io.on('connection', handleSocketConnection);

module.exports = io;
