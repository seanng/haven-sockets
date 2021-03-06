const { reply } = require('../helpers');
const { deleteRoom } = require('../../requests');

const handleSuccess = (client, id) =>
  reply(client, {
    type: 'app/FrontDesk/DELETE_ROOM_SUCCESS',
    id,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/FrontDesk/DELETE_ROOM_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    await deleteRoom(action.stayId);
    return handleSuccess(client, action.stayId);
  } catch (err) {
    return handleFail(client, err);
  }
};
