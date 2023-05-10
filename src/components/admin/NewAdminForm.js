import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'

class NewAdminForm extends Component {
    
    static contextType = AuthContext

    state = {
        fName: '',
        mName: '',
        lName: '',
        email: '',
        contactNumber: '',
        username: '',
        address: '',
        toAdminList: false,
        isSuperAdmin: true,
        isError: false,
        errorMessage: '',
        isLoggedIn: false,
        errorMessageDetails: '',
        showError: false
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()
        const isSuperAdmin = user.data.rol[0] === 'SuperAdmin'
        this.setState({ isSuperAdmin })
    }

    hideErrorMessage = (e) => {
        this.setState({ isError: false, showError: false })
      }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const Auth = this.context
        const user = Auth.getUser()

        const { fName, mName, lName, email, contactNumber, username, address } = this.state

        if (!(fName && lName && email && contactNumber && username && address)) {
            this.setState({
                isError: true,
                showError: true,
                errorMessage: 'Please, inform all fields!'
            })
            return
        }

        const toBeSaved = { fName, mName, lName, email, contactNumber, username, address }

        ezmaidApi.addAdmin(toBeSaved, user)
            .then(response => {
                this.setState({
                    fName: '',
                    mName: '',
                    lName: '',
                    email: '',
                    contactNumber: '',
                    username: '',
                    address: '',
                    toAdminList: true,
                    isSuperAdmin: true,
                    isError: false,
                    errorMessage: ''
                })

            })
            .catch(error => {
                handleLogError(error)
                if (error.response && error.response.data) {
                    const errorData = error.response.data

                    let errorMessage = '';
                    let errorMessageDetails = '';

                    if (errorData.message && errorData.details) {
                        errorMessage = errorData.message;
                        errorMessageDetails = errorData.details;
                    }

                    if (errorData.status === 409) {
                        errorMessage = errorData.message
                    } else if (errorData.status === 400) {
                        errorMessage = errorData.errors[0].defaultMessage
                    }
                    else {
                        this.setState({
                          errorMessage: errorMessage,
                          errorMessageDetails: errorMessageDetails,
                          showError: true,
                        })
                      }
                      this.setState({
                        isError: true,
                        errorMessage,
                        showError: true,
                      })
                }
            })
    }

    render() {
        const { isSuperAdmin, isError, errorMessage, toAdminList, errorMessageDetails, showError} = this.state

        if (!isSuperAdmin) {
            return <Navigate to='/' />
        } else if (toAdminList) {
            return <Navigate to='/admins' />
        } else {
            return (
                <>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-11 mt-5">

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Admin registration form</h5>
                                    <hr />
                                    <form className="row g-3">
                                        <div className="col-md-4">
                                            <Form.Input
                                                fluid
                                                autoFocus
                                                name='fName'
                                                iconPosition='left'
                                                placeholder='First Name'
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Input
                                                fluid
                                                name='mName'
                                                iconPosition='left'
                                                placeholder='Middle Name'
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Input
                                                fluid
                                                name='lName'
                                                iconPosition='left'
                                                placeholder='Last Name'
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Input
                                                fluid
                                                name='email'
                                                iconPosition='left'
                                                placeholder='Email'
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Input
                                                fluid
                                                name='contactNumber'
                                                iconPosition='left'
                                                placeholder='Contact No.'
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Input
                                                fluid
                                                name='username'
                                                iconPosition='left'
                                                placeholder='User name to use while login'
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <Form.TextArea
                                                rows={3}
                                                name='address'
                                                placeholder='Address'
                                                onChange={this.handleInputChange}
                                                style={{ "width": "100%", 'resize': 'none', 'border-color': '#deddd9' }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn main-color text-white" onClick={this.handleSubmit}>Submit</button>
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </form>
                                    {isError && showError && <Message negative onClick={this.hideErrorMessage}>{errorMessage}</Message>}
                                    {errorMessageDetails && showError && <Message negative onClick={this.hideErrorMessage}>{errorMessageDetails}</Message>}       
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default NewAdminForm