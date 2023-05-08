import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import CustomerTable from './CustomerTable'

class CustomerList extends Component {

    static contextType = AuthContext

    state = {
        customers: [],
        isAdmin: true,
        isSuperAdmin: true,
        isCustomersLoading: false,
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()

        const isAdmin = user.data.rol[0] === 'Admin'
        const isSuperAdmin = user.data.rol[0] === 'SuperAdmin'
        this.setState({ isAdmin })
        this.setState({ isSuperAdmin })

        this.handleGetCustomers()
    }

    handleGetCustomers = () => {
        const Auth = this.context
        const user = Auth.getUser()

        this.setState({ isCustomersLoading: true })
        ezmaidApi.customersList(user)
            .then(response => {
                this.setState({ customers: response.data })
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                this.setState({ isUsersLoading: false })
            })

    }

    render() {
        if (this.state.isSuperAdmin || this.state.isAdmin) {
            const customers = this.state.customers;

            return (
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-11 mt-5">
                        <div className='card'>
                            <div class="card-body">
                                <h5 class="card-title">Customer List</h5>
                                <div className='card-body'>
                                    <CustomerTable customers={customers} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Navigate to='/' />
        }
    }
}

export default CustomerList