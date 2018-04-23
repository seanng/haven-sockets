const { deleteHotelPhotos } = require('../../requests');
const { reply } = require('../helpers');

const handleSuccess = client =>
  reply(client, {
    type: 'app/PastStays/ERASE_HOTEL_PHOTOS_SUCCESS',
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'app/PastStays/ERASE_HOTEL_PHOTOS_ERROR',
    error,
  });

module.exports = async (client, action) => {
  try {
    await deleteHotelPhotos({ photos: action.photos });
    return handleSuccess(client);
  } catch (err) {
    return handleFail(client, err);
  }
};
