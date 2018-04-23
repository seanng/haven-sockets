const { reply } = require('../helpers');
const { updateCustomer } = require('../../requests');

const handleSuccess = (client, profile) =>
  reply(client, {
    type: 'SAVE_CUSTOMER_PROFILE_SUCCESS',
    profile,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'SAVE_CUSTOMER_PROFILE_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { profile, shouldHandleBase64 } = action;
    const info = await updateCustomer({
      profile,
      shouldHandleBase64,
    });
    return handleSuccess(client, info);
  } catch (error) {
    return handleFail(client, error);
  }
};
