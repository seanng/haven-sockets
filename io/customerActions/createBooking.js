const io = require('../../io');
const { createBooking } = require('../../requests');
const { emitToHotel, reply } = require('../helpers');
const logger = require('../../configs/logger');

const handleSuccess = (client, data, customerName, hotelId) => {
  emitToHotel(io, hotelId, {
    type: 'app/FrontDesk/SOCKET_CREATE_BOOKING',
    booking: {
      ...data,
      customerName,
    },
  });
  reply(client, {
    type: 'CREATE_BOOKING_SUCCESS',
    data,
  });
};

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'CREATE_BOOKING_FAILURE',
    errorMsg,
  });

module.exports = async (client, { profile, token, hotel }) => {
  try {
    const customerName = `${profile.firstName} ${profile.lastName}`;
    const booking = await createBooking({ token, hotel });
    return handleSuccess(client, booking, customerName, hotel.id);
  } catch (error) {
    logger.error(error);
    return handleFail(client, error);
  }
};
