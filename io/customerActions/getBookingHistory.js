const { fetchCustomerStays } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = (client, bookings) =>
  reply(client, {
    type: 'GET_BOOKING_HISTORY_SUCCESS',
    bookings,
  });

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'GET_BOOKING_HISTORY_FAIL',
    errorMsg,
  });

module.exports = async (client, action) => {
  try {
    const bookings = await fetchCustomerStays(action.token);
    return handleSuccess(client, bookings);
  } catch (error) {
    return handleFail(client, error);
  }
};
