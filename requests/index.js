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

/* ------------- Employee ------------- */

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

exports.employeeLogin = body =>
  rp({
    headers,
    method: 'POST',
    body,
    uri: `${baseUrl}/auth/employee`,
    json: true,
  });

/* ------------- Stay ------------- */

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

exports.checkIn = stayId =>
  rp({
    headers,
    method: 'PUT',
    uri: `${baseUrl}/stays/checkin/${stayId}`,
    json: true,
  });
