const { customerLogin } = require('../../requests');
const { reply, setCustomerSocketId } = require('../helpers');
const logger = require('../../configs/logger');

const handleSuccess = (client, data) => {
  reply(client, {
    type: 'CUSTOMER_AUTH_SUCCESS',
    data,
  });
};

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'CUSTOMER_AUTH_FAILURE',
    errorMsg,
  });

module.exports = async (client, action) => {
  try {
    const { email, password, socketId } = action;
    const { data, customerId } = await customerLogin({ email, password });
    setCustomerSocketId(customerId, socketId);
    return handleSuccess(client, data);
  } catch (error) {
    logger.error(error);
    return handleFail(client, error);
  }
};
