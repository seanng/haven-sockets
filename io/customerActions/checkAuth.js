const { fetchCustomerInfoFromToken } = require('../../requests');
const { reply, setCustomerSocketId } = require('../helpers');

const handleSuccess = (client, data) =>
  reply(client, {
    type: 'CUSTOMER_AUTH_SUCCESS',
    data,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'CUSTOMER_AUTH_FAILURE',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { data } = await fetchCustomerInfoFromToken(action.token);
    setCustomerSocketId(data['customer.id'], action.socketId);
    return handleSuccess(client, data);
  } catch (error) {
    handleFail(client, error);
    throw error;
  }
};
