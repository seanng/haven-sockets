const rp = require('request-promise');

const baseUrl = process.env.baseUrl || 'http://localhost:5050/api';
const headers = { 'User-Agent': 'Request-Promise' };

/* ------------- Auth ------------- */

exports.fetchEmployeeInfoFromToken = token =>
  rp({
    headers,
    uri: `${baseUrl}/auth/verify_employee_token`,
    method: 'POST',
    body: { token },
    json: true,
  });

/* ------------- Hotel ------------- */

exports.getHotelInfo = hotelId =>
  rp({
    headers,
    uri: `${baseUrl}/hotels/${hotelId}`,
    json: true,
  });

exports.deleteHotelPhotos = body =>
  rp({
    headers,
    body,
    uri: `${baseUrl}/hotels/photos`,
    json: true,
    method: 'DELETE',
  });

exports.updateHotel = (hotelId, body) =>
  rp({
    headers,
    method: 'PUT',
    body,
    json: true,
    uri: `${baseUrl}/hotels/${hotelId}`,
  });

/* ------------- Employee ------------- */

exports.fetchEmployees = hotelId =>
  rp({
    headers,
    uri: `${baseUrl}/employee/hotel/${hotelId}`,
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

exports.deleteEmployee = employeeId =>
  rp({
    headers,
    uri: `${baseUrl}/employee/${employeeId}`,
    method: 'DELETE',
    json: true,
  });

exports.updateEmployee = (employeeId, body) =>
  rp({
    headers,
    uri: `${baseUrl}/employee/${employeeId}`,
    method: 'PUT',
    body,
    json: true,
  });

exports.employeeLogin = body =>
  rp({
    headers,
    method: 'POST',
    body,
    uri: `${baseUrl}/auth/employee`,
    json: true,
  });

exports.deleteEmployeePhoto = body =>
  rp({
    headers,
    body,
    method: 'DELETE',
    json: true,
    uri: `${baseUrl}/employee/photo`,
  });

exports.createEmployeePhoto = (employeeId, body) =>
  rp({
    headers,
    body,
    method: 'POST',
    json: true,
    uri: `${baseUrl}/employee/photo${employeeId}`,
  });

/* ------------- Stay ------------- */

exports.fetchHotelStays = (hotelId, body) =>
  rp({
    headers,
    uri: `${baseUrl}/stays/hotel/${hotelId}`,
    body,
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

exports.deleteRoom = stayId =>
  rp({
    headers,
    uri: `${baseUrl}/stays/${stayId}`,
    method: 'DELETE',
    json: true,
  });

exports.checkIn = stayId =>
  rp({
    headers,
    method: 'put',
    uri: `${baseUrl}/stays/checkin/${stayId}`,
    json: true,
  });

exports.fetchCharges = stayId =>
  rp({
    headers,
    method: 'get',
    uri: `${baseUrl}/surcharge/stay/${stayId}`,
    json: true,
  });

exports.saveCharges = (stayId, body) =>
  rp({
    headers,
    body,
    method: 'post',
    uri: `${baseUrl}/surcharge/stay/${stayId}`,
    json: true,
  });
