const rp = require('request-promise');

const baseUrl = process.env.baseUrl || 'http://localhost:5052/api';
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

exports.fetchCustomerInfoFromToken = token =>
  rp({
    headers,
    uri: `${baseUrl}/auth/verify_customer_token`,
    method: 'POST',
    body: { token },
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

exports.customerLogin = body =>
  rp({
    headers,
    uri: `${baseUrl}/auth/customer`,
    method: 'POST',
    body,
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

exports.fetchCustomerStays = token =>
  rp({
    headers,
    uri: `${baseUrl}/stays/customer/${token}`,
    json: true,
  });

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

exports.createBooking = body =>
  rp({
    headers,
    uri: `${baseUrl}/stays/`,
    method: 'PUT',
    json: true,
    body,
  });

exports.updateStay = (stayId, body) =>
  rp({
    headers,
    uri: `${baseUrl}/stays/${stayId}`,
    method: 'PUT',
    json: true,
    body,
  });

exports.deleteRoom = stayId =>
  rp({
    headers,
    uri: `${baseUrl}/stays/${stayId}`,
    method: 'DELETE',
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

/* ------------- Customer ------------- */

exports.deleteCustomerPhoto = body =>
  rp({
    headers,
    body,
    method: 'delete',
    uri: `${baseUrl}/customer/photo`,
    json: true,
  });

exports.updateCustomer = body =>
  rp({
    headers,
    body,
    method: 'put',
    uri: `${baseUrl}/customer`,
    json: true,
  });
