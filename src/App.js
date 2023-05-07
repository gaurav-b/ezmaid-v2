import React from 'react'
import './App.css';
import './style.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Navbar from './components/misc/Navbar'
import Footer from './components/misc/Footer'
import ContactUs from './components/misc/ContactUs'
import AboutUs from './components/misc/AboutUs'
import Home from './components/home/Home'
import Login from './components/home/Login'
import Signup from './components/home/Signup'
import AdminPage from './components/admin/AdminPage'
import UserPage from './components/user/UserPage'
import AdminList from './components/admin/AdminList'
import CustomerList from './components/customer/CustomerList'
import MaidList from './components/maid/MaidList'
import NewAdminForm from './components/admin/NewAdminForm';
import CustomerProfile from './components/customer/CustomerProfile';
import MaidProfile from './components/maid/MaidProfile';
import AdminProfile from './components/admin/AdminProfile';
import SuperAdminProfile from './components/admin/SuperAdminProfile';

function App() {
  return (
    <AuthProvider>
      <div className='d-flex flex-column min-vh-100'>
        <Router>
          <Navbar />
          <div className='flex-grow-1'>
            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              
              {/* Profile paths */}
              <Route path="/customerprofile" element={<PrivateRoute><CustomerProfile /></PrivateRoute>} />
              <Route path="/maidprofile" element={<PrivateRoute><MaidProfile /></PrivateRoute>} />
              <Route path="/adminprofile" element={<PrivateRoute><AdminProfile /></PrivateRoute>} />
              <Route path="/superadminprofile" element={<PrivateRoute><SuperAdminProfile /></PrivateRoute>} />

              <Route path="/admins" element={<PrivateRoute><AdminList /></PrivateRoute>} />
              <Route path="/newadmin" element={<PrivateRoute><NewAdminForm /></PrivateRoute>} />
              <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
              <Route path="/maids" element={<PrivateRoute><MaidList /></PrivateRoute>} />
              <Route path="/adminpage" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
              <Route path="/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/aboutus' element={<AboutUs />} />

            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
