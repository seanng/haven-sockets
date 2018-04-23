const { fetchEmployeeInfoFromToken } = require('../../requests');
const { reply, linkEmployeeToHotelSockets } = require('../helpers');

const handleSuccess = (client, user, token) =>
  reply(client, {
    type: 'app/Login/EMPLOYEE_LOGIN_SUCCESS',
    user,
    token,
  });

const handleFail = (client, err, token) =>
  reply(client, {
    type: 'app/app/INVALIDATE_TOKEN',
    err,
    token,
  });

module.exports = async (client, action) => {
  try {
    const employee = await fetchEmployeeInfoFromToken(action.token);
    linkEmployeeToHotelSockets(client, employee.hotelId);
    return handleSuccess(client, employee, action.token);
  } catch (error) {
    handleFail(client, error, action.token);
    throw error;
  }
};
