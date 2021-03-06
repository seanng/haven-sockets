const io = require('../../io');
const { updateStay } = require('../../requests');
const { reply, emitToCustomer } = require('../helpers');

const handleSuccess = (client, customerId, data) => {
  emitToCustomer(io, customerId, {
    type: 'SOCKET_CHECKED_IN',
    data,
  });
  reply(client, {
    type: 'app/FrontDesk/CHECK_IN_SUCCESS',
    data,
  });
};

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/FrontDesk/CHECK_IN_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const data = await updateStay(action.stayId, { action: 'checkin' });
    return handleSuccess(client, action.customerId, data);
  } catch (err) {
    return handleFail(client, err);
  }
};
