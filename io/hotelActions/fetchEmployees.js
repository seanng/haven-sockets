const { reply } = require('../helpers');
const { fetchEmployees } = require('../../requests');

const handleSuccess = (client, employees) =>
  reply(client, {
    type: 'app/TeamManagement/FETCH_EMPLOYEES_SUCCESS',
    employees,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/TeamManagement/FETCH_EMPLOYEES_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const employees = await fetchEmployees(action.hotelId);
    return handleSuccess(client, employees);
  } catch (error) {
    return handleFail(client, error);
  }
};
