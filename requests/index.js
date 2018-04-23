const rp = require('request-promise');

const baseUrl = process.env.baseUrl || 'http://localhost:5050/api';
const headers = { 'User-Agent': 'Request-Promise' };

exports.fetchEmployeeInfoFromToken = token =>
  rp({
    headers,
    uri: `${baseUrl}/auth/verify_employee_token`,
    method: 'POST',
    body: { token },
    json: true,
  });

exports.fetchActiveStays = hotelId =>
  rp({
    headers,
    uri: `${baseUrl}/stays/active/${hotelId}`,
    json: true,
  });

exports.createRoom = (hotelId, roomNumber) =>
  rp({
    headers,
    uri: `${baseUrl}/stays`,
    method: 'POST',
    body: { hotelId, roomNumber },
    json: true,
  });

exports.addEmployee = body =>
  rp({
    headers,
    uri: `${baseUrl}/employee/`,
    method: 'POST',
    body,
    json: true,
  });

exports.getHotelInfo = hotelId =>
  rp({
    headers,
    uri: `${baseUrl}/hotels/${hotelId}`,
    json: true,
  });
