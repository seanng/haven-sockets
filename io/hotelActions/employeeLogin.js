const logger = require('../../configs/logger');
const { employeeLogin } = require('../../requests');
const { linkEmployeeToHotelSockets, reply } = require('../helpers');

const handleSuccess = (client, token, user) =>
  reply(client, {
    type: 'app/Login/EMPLOYEE_LOGIN_SUCCESS',
    token,
    user,
  });

const handleFail = (client, err) => {
  reply(client, {
    type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
    msg: err,
  });
};

module.exports = async (client, action) => {
  try {
    const { email, password } = action.info;
    const { employee, token } = await employeeLogin({ email, password });
    linkEmployeeToHotelSockets(client, employee.hotelId);
    return handleSuccess(client, token, employee);
  } catch (err) {
    logger.error(err);
    return handleFail(client, err);
  }
};
