const { updateEmployee, createEmployeePhoto } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = (profile, client) =>
  reply(client, {
    type: 'app/Settings/SAVE_EMPLOYEE_PROFILE_SUCCESS',
    profile,
  });

const handleFail = (err, client) =>
  reply(client, {
    type: 'app/Settings/SAVE_EMPLOYEE_PROFILE_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { profile, shouldHandleImageBlob } = action;
    if (!shouldHandleImageBlob) {
      const info = await updateEmployee(profile.id, profile);
      return handleSuccess(info, client);
    }
    const photoUrl = await createEmployeePhoto(profile.id, {
      photoUrl: profile.photoUrl,
    });
    const info = await updateEmployee(profile.id, { ...profile, photoUrl });
    return handleSuccess(info, client);
  } catch (error) {
    return handleFail(error, client);
  }
};
