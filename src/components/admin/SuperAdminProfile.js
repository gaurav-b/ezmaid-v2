import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Message } from 'semantic-ui-react'
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import AuthContext from '../context/AuthContext'

class SuperAdminProfile extends Component {

    static contextType = AuthContext

    state = {
        adminId: '',
        fName: '',
        mName: '',
        lName: '',
        contactNumber: '',
        address: '',
        email: '',
        username: '',
        isSuperAdmin: true,
        currpassword: '',
        newpassword: '',
        isAdminsLoading: false,
        message: '',
        isError: false,
        isSuccess: false,
        showError: false,
        showSuccess: false
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()

        const isSuperAdmin = user.data.rol[0] === 'SuperAdmin'
        this.setState({ isSuperAdmin })

        this.handleGetProfile()
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleGetProfile = () => {
        const Auth = this.context
        const user = Auth.getUser()

        const adminId = user.data.pid;
        this.setState({ isAdminsLoading: true })

        ezmaidApi.getAdminProfile(user, adminId)
            .then(response => {

                this.setState({ fName: response.data.fName })
                this.setState({ mName: response.data.mName })
                this.setState({ lName: response.data.lName })
                this.setState({ contactNumber: response.data.contactNumber })
                this.setState({ address: response.data.address })
                this.setState({ email: response.data.email })
                this.setState({ username: response.data.user.username })
            })
            .catch(error => {
                handleLogError(error)
                this.setState({
                    isError: true,
                    showError: true,
                    isSuccess: false,
                    showSuccess: false,
                    message: error.message
                })
            })
            .finally(() => {
                this.setState({ isUsersLoading: false })
            })
    }

    handleChangePassword = (e) => {

        e.preventDefault()

        const Auth = this.context
        const user = Auth.getUser()

        const { username, currpassword, newpassword } = this.state
        this.setState({ isAdminsLoading: true })

        if (!(username && currpassword && newpassword)) {
            this.setState({
                isError: true,
                showError: true,
                isSuccess: false,
                showSuccess: false,
                message: 'Please, inform all fields!'
            })
            return
        }

        const toBeUpdated = { username, currpassword, newpassword }

        ezmaidApi.changePassword(user, toBeUpdated)
            .then(response => {
                this.setState({
                    isError: false,
                    showError: false,
                    isSuccess: true,
                    showSuccess: true,
                    message: 'Password changed successfully!'
                })
            })
            .catch(error => {
                handleLogError(error)

                if (error.response && error.response.data) {
                    const errorData = error.response.data

                    let errorMessage = '';

                    if (errorData.message) {
                        errorMessage = errorData.message;
                    } else {
                        errorMessage = 'Something went wrong!';
                    }
  
                    this.setState({
                        isError: true,
                        showError: true,
                        isSuccess: false,
                        showSuccess: false,
                        message: errorMessage
                    })
                }
            })
            .finally(() => {
                this.setState({ isUsersLoading: false })
            })
    }

    hideSuccessMessage = (e) => {
        this.setState({ isSuccess: false, showSuccess: false })
    }

    hideErrorMessage = (e) => {
        this.setState({ isError: false, showError: false })
    }

    render() {
        const { isSuperAdmin, adminId, fName, mName, lName, contactNumber, address, email, username, message, isError, isSuccess, showError, showSuccess } = this.state

        if (!isSuperAdmin) {
            return <Navigate to='/' />
        } else {
            return (
                <>
                    <div className='mt-5 container'>
                        <section class="section profile">
                            <div class="row">

                                <div class="card">
                                    <div class="card-body pt-3">
                                        <ul class="nav nav-tabs nav-tabs-bordered">

                                            <li class="nav-item">
                                                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                            </li>

                                            <li class="nav-item">
                                                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                            </li>

                                        </ul>
                                        <div class="tab-content pt-2">

                                            <div class="tab-pane fade show active profile-overview" id="profile-overview">

                                                <h5 class="card-title">Profile Details</h5>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label ">Full Name</div>
                                                    <div class="col-lg-9 col-md-8">{fName + ' ' + mName + ' ' + lName}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Contact Number</div>
                                                    <div class="col-lg-9 col-md-8">{contactNumber}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Address</div>
                                                    <div class="col-lg-9 col-md-8">{address}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Email</div>
                                                    <div class="col-lg-9 col-md-8">{email}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Super Admin</div>
                                                    <div class="col-lg-9 col-md-8">{isSuperAdmin ? 'True' : 'False'}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Username</div>
                                                    <div class="col-lg-9 col-md-8">{username}</div>
                                                </div>
                                            </div>

                                            <div class="tab-pane fade pt-3" id="profile-change-password">
                                                <form>

                                                    <div class="row mb-3">
                                                        <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                        <div class="col-md-8 col-lg-9">
                                                            <Form.Input
                                                                fluid
                                                                autoFocus
                                                                name='currpassword'
                                                                id="currentPassword"
                                                                iconPosition='left'
                                                                type='password'
                                                                placeholder='Current password'
                                                                onChange={this.handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                        <div class="col-md-8 col-lg-9">
                                                            <Form.Input
                                                                fluid
                                                                autoFocus
                                                                name='newpassword'
                                                                id="newPassword"
                                                                iconPosition='left'
                                                                type='password'
                                                                placeholder='New password'
                                                                onChange={this.handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="text-center">
                                                        <button className="btn main-color text-white" type="submit" onClick={this.handleChangePassword}>Change Password</button>
                                                    </div>
                                                </form>

                                                {isError && showError && <Message negative onClick={this.hideErrorMessage}>{message}</Message>}
                                                {isSuccess && showSuccess && <Message info onClick={this.hideSuccessMessage}>{message}</Message>}
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </section>
                    </div>
                </>
            )
        }
    }
}

export default SuperAdminProfile    