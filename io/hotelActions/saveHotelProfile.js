const { updateHotel } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = (hotelInfo, client) =>
  reply(client, {
    type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_SUCCESS',
    hotelInfo,
  });

const handleFail = (err, client) =>
  reply(client, {
    type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { hotelInfo, shouldHandleImageBlobs } = action;
    const info = await updateHotel(hotelInfo.id, {
      hotelInfo,
      shouldHandleImageBlobs,
    });
    return handleSuccess(info, client);
  } catch (error) {
    return handleFail(error, client);
  }
};
