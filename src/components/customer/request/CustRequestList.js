import { Component } from 'react'
import AuthContext from '../../context/AuthContext'
import { ezmaidApi } from '../../misc/EzmaidApi'
import { handleLogError } from '../../misc/Helpers'
import CustRequestTable from '../request/CustRequestTable'
import { Navigate } from 'react-router-dom'

class CustRequestList extends Component {

    static contextType = AuthContext

    state = {
        requests: [],
        isCustomer: true,
        isAdmin: true,
        isSuperAdmin: true,
        showModal: false,
        isError: false,
        errorMessage: '',
        errorMessageDetails: '',
        showError: false,
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()

        const isCustomer = user.data.rol[0] === 'Customer'
        const isAdmin = user.data.rol[0] === 'Admin'
        const isSuperAdmin = user.data.rol[0] === 'SuperAdmin'

        this.setState({ isAdmin })
        this.setState({ isSuperAdmin })
        this.setState({ isCustomer })

        this.handleGetRequests()
    }

    handleGetRequests = () => {
        const Auth = this.context
        const user = Auth.getUser()

        ezmaidApi.requestListCust(user)
            .then(response => {
                this.setState({ requests: response.data })
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    render() {

        const {isCustomer, requests, showModal, isError, errorMessageDetails, showError } = this.state

        if (isCustomer) {
            const { requests, errorMessage, toAdminList } = this.state
            return (
                <>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-11 mt-5">
                            <div className='card'>
                                <div class="card-header">
                                    <nav className='navbar navbar-expand-lg navbar-dark py-3'>
                                        <div className='navbar-collapse' id='navbarNavDropdown'>
                                            <ul className='navbar-nav'>
                                                <li className='nav-item'>
                                                    <h5 className="card-title">Request List</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div>
                                    <div className='card-body'>
                                        <CustRequestTable requests={requests} handleGetRequests={this.handleGetRequests} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            
        } else {
            return <Navigate to='/' />
        }
    }
}

export default CustRequestList    