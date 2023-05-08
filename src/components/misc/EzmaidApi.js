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

  getUsers,
  deleteUser,
  getUserMe
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





function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : '/api/users'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { 
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function getUserMe(user) {
  return instance.get('/api/users/me', {
    headers: { 'Authorization': bearerAuth(user) }
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