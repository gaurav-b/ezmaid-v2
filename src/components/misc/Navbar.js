import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const logout = () => {
    userLogout()
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }

  const superAdminStyle = () => {
    const user = getUser()
    return user && user.data.rol[0] === 'SuperAdmin' ? { "display": "block" } : { "display": "none" }
  }

  const adminStyle = () => {
    const user = getUser()
    return user && user.data.rol[0] === 'Admin' ? { "display": "block" } : { "display": "none" }
  }

  const customerStyle = () => {
    const user = getUser()
    return user && user.data.rol[0] === 'Customer' ? { "display": "block" } : { "display": "none" }
  }

  const maidStyle = () => {
    const user = getUser()
    return user && user.data.rol[0] === 'Maid' ? { "display": "block" } : { "display": "none" }
  }
  
  const adminAndSuperAdminStyle = () => {
    const user = getUser()
    return user && (user.data.rol[0] === 'SuperAdmin' || user.data.rol[0] === 'Admin') ? { "display": "block" } : { "display": "none" }
  }

  const adminAndSuperAdminAndCustomerStyle = () => {
    const user = getUser()
    return user && (user.data.rol[0] === 'SuperAdmin' || user.data.rol[0] === 'Admin'|| user.data.rol[0] === 'Customer') ? { "display": "block" } : { "display": "none" }
  }

  const getUserName = () => {
    const user = getUser()
    return user ? user.data.name : ''
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
        <div className='container-fluid'>
          <span className='navbar-brand'><NavLink className='nav-link' to='/'>ezMaid</NavLink></span>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown' aria-expanded='false'
            aria-label='Toggle Navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>Home</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={logoutMenuStyle() && superAdminStyle()} to='/superadminprofile'>Profile</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={logoutMenuStyle() && adminStyle()} to='/adminprofile'>Profile</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={logoutMenuStyle() && customerStyle()} to='/customerprofile'>Profile</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={logoutMenuStyle() && maidStyle()} to='/maidprofile'>Profile</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={superAdminStyle()} to='/admins'>Admin List</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={adminAndSuperAdminStyle()} to='/customers'>Customer List</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={adminAndSuperAdminAndCustomerStyle()} to='/maids'>Maid List</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={logoutMenuStyle() && customerStyle()} to='/custrequests'>Request List</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' style={logoutMenuStyle() && maidStyle()} to='/maidrequests'>Request List</NavLink>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item m-1'>
                <NavLink type='button' className='btn btn-outline-light' to='/login' style={enterMenuStyle()}>Sign In</NavLink>
              </li>
              <li className='nav-item m-1'>
                <span className='navbar-brand' style={logoutMenuStyle()}>{`Hi ${getUserName()}`}</span>
              </li>
              <li className='nav-item m-1'>
                <NavLink type='button' className='btn btn-outline-light' to='/login' style={logoutMenuStyle()} onClick={logout}>Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
