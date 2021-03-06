const { fetchHotelStays } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = (client, rooms) =>
  reply(client, {
    type: 'app/FrontDesk/FETCH_ROOMS_SUCCESS',
    rooms,
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'app/FrontDesk/FETCH_ROOMS_ERROR',
    error,
  });

module.exports = async (client, action) => {
  try {
    const rooms = await fetchHotelStays(action.hotelId, { filter: 'active' });
    return handleSuccess(client, rooms);
  } catch (error) {
    return handleFail(client, error);
  }
};
