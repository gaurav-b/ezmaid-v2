import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Form, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { ezmaidApi } from '../misc/EzmaidApi'
import { parseJwt, handleLogError } from '../misc/Helpers'

class Login extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    isLoggedIn: false,
    isError: false,
    showError: false
  }

  componentDidMount() {
    const Auth = this.context
    const isLoggedIn = Auth.userIsAuthenticated()
    this.setState({ isLoggedIn })
  }

  hideErrorMessage = (e) => {
    this.setState({ isError: false, showError: false })
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password } = this.state
    if (!(username && password)) {
      this.setState({ isError: true })
      this.setState({ showError: true })
      return
    }

    ezmaidApi.authenticate(username, password)
      .then(response => {

        console.log(response);

        const { accessToken } = response.data
        const data = parseJwt(accessToken)
        const user = { data, accessToken }

        const Auth = this.context
        Auth.userLogin(user)

        this.setState({
          username: '',
          password: '',
          isLoggedIn: true,
          isError: false
        })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ isError: true })
        this.setState({ showError: true })
      })
  }

  render() {
    const { isLoggedIn, isError, showError } = this.state
    if (isLoggedIn) {
      return <Navigate to={'/'} />
    } else {
      return (
        <>
          <div className="container">
            <div className="container col-lg-4 mt-5 d-flex flex-column align-items-center justify-content-center">
              <div className="row justify-content-center">
                <div className="card mb-3">

                  <div className="card-body">

                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p className="text-center small">Enter your username & password to login</p>
                    </div>

                    <form className="row g-3 needs-validation">

                      <div className="col-12">
                        <Form.Input
                          fluid
                          autoFocus
                          name='username'
                          icon='user'
                          iconPosition='left'
                          placeholder='Username'
                          onChange={this.handleInputChange}
                        />
                        <div className="invalid-feedback">Please enter your username.</div>
                      </div>

                      <div className="col-12">
                        <Form.Input
                          fluid
                          name='password'
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password'
                          type='password'
                          onChange={this.handleInputChange}
                        />
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <button className="btn main-color btn-primary w-100" type="submit" onClick={this.handleSubmit}>Login</button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Don't have account? <Link href="pages-register.html" to="/signup">Create an account</Link></p>
                      </div>
                    </form>

                    {isError && showError && <Message negative onClick={this.hideErrorMessage}>The username or password provided are incorrect!</Message>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

export default Login