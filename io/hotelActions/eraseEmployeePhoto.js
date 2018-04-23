const { deleteEmployeePhoto } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = client =>
  reply(client, {
    type: 'app/Settings/ERASE_EMPLOYEE_PHOTO_SUCCESS',
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'app/Settings/ERASE_EMPLOYEE_PHOTO_ERROR',
    error,
  });

module.exports = async (client, action) => {
  try {
    await deleteEmployeePhoto({ photo: action.photo });
    return handleSuccess(client);
  } catch (error) {
    return handleFail(client, error);
  }
};
