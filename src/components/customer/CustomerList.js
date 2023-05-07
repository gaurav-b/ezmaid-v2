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
        // adminId: '',
        // fName: '',
        // mName: '',
        // lName: '',
        // contactNumber: '',
        // address: '',
        // email: ''
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
                <div className='mt-5 container'>
                    <div className='card'>
                        <div className='card-header'>
                            Customers list
                        </div>
                        <div className='card-body'>
                            <CustomerTable customers={customers} />
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