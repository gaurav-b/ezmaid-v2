import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Message} from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { ezmaidApi } from '../misc/EzmaidApi'
import { parseJwt, handleLogError } from '../misc/Helpers'

class Signup extends Component {
  static contextType = AuthContext

  state = {
    isCustomer: true,
    fName: '',
    mName: '',
    lName: '',
    email: '',
    contactNumber: '',
    username: '',
    password: '',
    adharCardNumber: '',
    panCardNumber: '',
    address: '',
    isLoggedIn: false,
    isError: false,
    errorMessage: ''
  }

  componentDidMount() {
    const Auth = this.context
    const isLoggedIn = Auth.userIsAuthenticated()
    this.setState({ isLoggedIn })
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { isCustomer, fName, mName, lName, email, contactNumber, username, password, adharCardNumber, panCardNumber, address } = this.state

    if (!(isCustomer && fName && lName && email && contactNumber && username && password && adharCardNumber && panCardNumber && address)) {
      this.setState({
        isError: true,
        errorMessage: 'Please, inform all fields!'
      })
      return
    }

    const toBeSaved = { isCustomer, fName, mName, lName, email, contactNumber, username, password, adharCardNumber, panCardNumber, address }

    ezmaidApi.signup(toBeSaved)
      .then(response => {
        const { accessToken } = response.data
        const data = parseJwt(accessToken)
        const user = { data, accessToken }

        const Auth = this.context
        Auth.userLogin(user)

        this.setState({
          username: '',
          password: '',
          isLoggedIn: true,
          isError: false,
          errorMessage: ''
        })
      })
      .catch(error => {
        handleLogError(error)
        if (error.response && error.response.data) {
          const errorData = error.response.data
          let errorMessage = 'Invalid fields'
          if (errorData.status === 409) {
            errorMessage = errorData.message
          } else if (errorData.status === 400) {
            errorMessage = errorData.errors[0].defaultMessage
          }
          this.setState({
            isError: true,
            errorMessage
          })
        }
      })
  }

  render() {
    const { isLoggedIn, isError, errorMessage } = this.state
    if (isLoggedIn) {
      return <Navigate to='/' />
    } else {
      return (
        <>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-11 mt-5">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Register to explore more!</h5>
                  <hr />
                  <form className="row g-3">
                    <div className="col-sm-10">
                      <div className="form-check">
                        <Form.Radio
                          fluid
                          name='isCustomer'
                          id='customer'
                          value='true'
                          onChange={this.handleInputChange}
                          label="Customer"
                        />
                      </div>
                      <div className="form-check">
                        <Form.Radio
                          fluid
                          name='isCustomer'
                          id='maid'
                          value='false'
                          onChange={this.handleInputChange}
                          label="Maid"
                        />
                      </div>
                    </div>

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
                    <div className="col-md-6">
                      <Form.Input
                        type="password"
                        fluid
                        name='password'
                        iconPosition='left'
                        placeholder='Password to use while login'
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="col-6">
                      <Form.Input
                        fluid
                        name='adharCardNumber'
                        iconPosition='left'
                        placeholder='Adhaar Crad No.'
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <Form.Input
                        fluid
                        name='panCardNumber'
                        iconPosition='left'
                        placeholder='Pan Card No.n'
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <Form.TextArea
                        rows={3}
                        name='address'
                        placeholder='Address'
                        onChange={this.handleInputChange}
                        style={{ "width": "100%", 'resize': 'none', 'border-color': '#deddd9'}}
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn main-color text-white" onClick={this.handleSubmit}>Submit</button>
                      <button type="reset" className="btn btn-secondary">Reset</button>
                    </div>
                  </form>
                  {isError && <Message negative>{errorMessage}</Message>}
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

export default Signup