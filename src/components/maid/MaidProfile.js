import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Message } from 'semantic-ui-react'
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import AuthContext from '../context/AuthContext'

class MaidProfile extends Component {

    static contextType = AuthContext

    state = {
        maidId: '',
        fName: '',
        mName: '',
        lName: '',
        contactNumber: '',
        address: '',
        email: '',
        adharCardNumber: '',
        panCardNumber: '',
        username: '',
        isMaid: true,
        currpassword: '',
        newpassword: '',
        isLoading: false,
        message: '',
        isError: false,
        isSuccess: false,
        showError: false,
        showSuccess: false
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()

        const isMaid = user.data.rol[0] === 'Maid'
        this.setState({ isMaid })

        this.handleGetProfile()
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleGetProfile = () => {
        const Auth = this.context
        const user = Auth.getUser()

        const maidId = user.data.pid;
        this.setState({ isLoading: true })

        ezmaidApi.getMaidProfile(user, maidId)
            .then(response => {
                this.setState({ fName: response.data.fName })
                this.setState({ mName: response.data.mName })
                this.setState({ lName: response.data.lName })
                this.setState({ contactNumber: response.data.contactNumber })
                this.setState({ address: response.data.address })
                this.setState({ email: response.data.email })
                this.setState({ adharCardNumber: response.data.adharCardNumber })
                this.setState({ panCardNumber: response.data.panCardNumber })
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

        const { username, currpassword, newpassword} = this.state
        this.setState({ isLoading: true })

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
                    currpassword: '',
                    newpassword: '',
                    isError: false,
                    showError: false,
                    isSuccess: true,
                    showSuccess: true,
                    message: 'Password changed successfully!'
                })
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

    hideSuccessMessage = (e) => {
        this.setState({isSuccess: false, showSuccess: false})
    }

    hideErrorMessage = (e) => {
        this.setState({isError: false, showError: false})
    }

    render() {
        const { isMaid, fName, mName, lName, contactNumber, address, email, adharCardNumber, panCardNumber, username, message, isError, isSuccess, showError, showSuccess } = this.state

        if (!isMaid) {
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
                                                    <div class="col-lg-3 col-md-4 label">Adhar Card Number</div>
                                                    <div class="col-lg-9 col-md-8">{adharCardNumber}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">PAN Card Number</div>
                                                    <div class="col-lg-9 col-md-8">{panCardNumber}</div>
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
                                                                placeholder='New password'
                                                                onChange={this.handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="text-center">
                                                        <button className="btn main-color btn-primary" type="submit" onClick={this.handleChangePassword}>Change Password</button>
                                                    </div>
                                                </form>

                                                {isError && showError && <Message negative onClick={this.hideErrorMessage}>{message}</Message>}
                                                {isSuccess && showSuccess && <Message negative onClick={this.hideSuccessMessage}>{message}</Message>}
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

export default MaidProfile    