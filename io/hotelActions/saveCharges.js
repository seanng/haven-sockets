const { reply } = require('../helpers');
const { saveCharges } = require('../../requests');

const handleSuccess = (client, updatedCharges, stayId, newTotal) =>
  reply(client, {
    type: 'app/PastStays/SAVE_CHARGES_SUCCESS',
    updatedCharges,
    stayId,
    newTotal,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'SAVE_CHARGES_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { charges, newTotal, stayId } = action;
    const updatedCharges = await saveCharges(stayId, { charges, newTotal });
    return handleSuccess(client, updatedCharges, stayId, newTotal);
  } catch (error) {
    return handleFail(error);
  }
};
