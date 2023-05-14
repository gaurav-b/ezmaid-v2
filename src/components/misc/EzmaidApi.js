import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const ezmaidApi = {
  authenticate,
  signup,
  adminList,
  customersList,
  maidsList,
  addAdmin,
  getAdminProfile,
  getMaidProfile,
  getCustomerProfile,
  changePassword,
  deactivateUser,
  activateUser,
  verifyCustomer,
  verifyMaid,
  addNewRqst,
  requestListCust,
  requestListMaid,
  cancelRequest,
  finalizeRequest,
  fulfillRequest,
  updateRatings,
  maidAcceptRequest,
  maidRejectRequest,
  addCustomerRating
}

function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function signup(toBeSaved) {
  return instance.post('/auth/signup', toBeSaved, {
    headers: { 'Content-type': 'application/json' }
  })
}

function adminList(user) {
  return instance.get('/super/admins', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function customersList(user) {
  return instance.get('/customers', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function maidsList(user) {
  return instance.get('/maids', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function addAdmin(toBeSaved, user) {
  return instance.post('/admins', toBeSaved, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getAdminProfile(user, adminId) {
  return instance.get(`/admins/${adminId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getMaidProfile(user, maidId) {
  return instance.get(`/maids/${maidId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getCustomerProfile(user, customerId) {
  return instance.get(`/customers/${customerId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function changePassword(user, toBeUpdated) {
  return instance.put('/users/changepass', toBeUpdated, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function deactivateUser(user, payload) {
  return instance.put('/users/deactivate', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function activateUser(user, payload) {
  return instance.put('/users/activate', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function verifyCustomer(user, payload) {
  return instance.put('/customers/verify', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function verifyMaid(user, payload) {
  return instance.put('/maids/verify', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function addNewRqst(toBeSaved, user) {
  return instance.post('/requests', toBeSaved, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function requestListCust(user) {
  return instance.get('/requests/customers', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function requestListMaid(user) {
  return instance.get('/requests/maids', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function cancelRequest(user, payload) {
  return instance.put('/requests/cancel', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function finalizeRequest(user, payload) {
  return instance.put('/requests/finalize', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function fulfillRequest(user, payload) {
  return instance.put('/requests/fulfill', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function updateRatings(user, payload) {
  return instance.put('/requests/updateRatings', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function maidAcceptRequest(user, payload) {
  return instance.put('/requests/details/maids/accept', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function maidRejectRequest(user, payload) {
  return instance.put('/requests/details/maids/reject', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function addCustomerRating(user, payload) {
  return instance.put('/requests/customers/ratings', payload, {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}