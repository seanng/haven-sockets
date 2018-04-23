const { addEmployee } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = (client, employees) =>
  reply(client, {
    type: 'app/TeamManagement/ADD_EMPLOYEE_SUCCESS',
    employees,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/TeamManagement/ADD_EMPLOYEE_FAIL',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { details, userId, hotelId } = action;
    const employees = await addEmployee({ details, userId, hotelId });
    return handleSuccess(client, employees);
  } catch (error) {
    return handleFail(client, error);
  }
};
