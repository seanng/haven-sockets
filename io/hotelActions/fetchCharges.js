const { reply } = require('../helpers');
const { fetchCharges } = require('../../requests');

const handleSuccess = (client, charges) =>
  reply(client, {
    type: 'app/PastStays/FETCH_CHARGES_SUCCESS',
    charges,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/PastStays/FETCH_CHARGES_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const charges = await fetchCharges(action.stayId);
    return handleSuccess(client, charges);
  } catch (err) {
    return handleFail(client, err);
  }
};
