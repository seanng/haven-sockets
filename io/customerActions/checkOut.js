const io = require('../../io');
const { updateStay } = require('../../requests');
const { reply, emitToHotel } = require('../helpers');
const logger = require('../../configs/logger');

const handleSuccess = (client, data) => {
  emitToHotel(io, data.hotelId, {
    type: 'app/FrontDesk/SOCKET_CHECK_OUT',
    stayId: data.id,
  });

  reply(client, {
    type: 'CHECK_OUT_BOOKING_SUCCESS',
    data,
  });
};

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'CHECK_OUT_BOOKING_FAILURE',
    errorMsg,
  });

module.exports = async (client, action) => {
  try {
    const { stayId, token } = action;
    const data = await updateStay(stayId, {
      token,
      action: 'checkout',
    });
    return handleSuccess(client, data);
  } catch (error) {
    logger.error(error);
    return handleFail(client, error);
  }
};
