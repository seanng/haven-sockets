const io = require('../../io');
const { updateStay } = require('../../requests');
const { emitToHotel, reply } = require('../helpers');

const handleSuccess = (client, stayId, hotelId) => {
  emitToHotel(io, hotelId, {
    type: 'app/FrontDesk/SOCKET_CANCEL_BOOKING',
    stayId,
  });
  reply(client, {
    type: 'CANCEL_BOOKING_SUCCESS',
  });
};

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'CANCEL_BOOKING_FAILURE',
    errorMsg,
  });

module.exports = async (client, action) => {
  try {
    const { token, stayId, hotelId } = action;
    await updateStay(stayId, {
      token,
      action: 'cancel',
    });
    return handleSuccess(client, stayId, hotelId);
  } catch (error) {
    return handleFail(client, error);
  }
};
