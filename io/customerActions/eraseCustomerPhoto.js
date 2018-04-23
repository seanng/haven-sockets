const { deleteCustomerPhoto } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = client =>
  reply(client, {
    type: 'ERASE_CUSTOMER_PHOTO_SUCCESS',
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'ERASE_CUSTOMER_PHOTO_ERROR',
    error,
  });

module.exports = async (client, action) => {
  try {
    await deleteCustomerPhoto(action.photo);
    return handleSuccess(client);
  } catch (error) {
    return handleFail(client, error);
  }
};
