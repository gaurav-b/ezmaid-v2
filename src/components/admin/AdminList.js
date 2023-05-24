import { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import AdminTable from './AdminTable'

class AdminList extends Component {

    static contextType = AuthContext

    state = {
        admins: [],
        isSuperAdmin: true,
        isAdminsLoading: false,
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()
        const isSuperAdmin = user.data.rol[0] === 'SuperAdmin'
        this.setState({ isSuperAdmin })

        this.handleGetAdmins()
    }

    handleGetAdmins = () => {
        const Auth = this.context
        const user = Auth.getUser()

        this.setState({ isAdminsLoading: true })
        ezmaidApi.adminList(user)
            .then(response => {
                this.setState({ admins: response.data })
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                this.setState({ isUsersLoading: false })
            })

    }

    render() {
        if (!this.state.isSuperAdmin) {
            return <Navigate to='/' />
        } else {
            const admins = this.state.admins;
            return (
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-11 mt-5">
                        <div className='card'>
                            <div class="card-header">
                                <nav className='navbar navbar-expand-lg navbar-dark py-3'>
                                    <div className='navbar-collapse' id='navbarNavDropdown'>
                                        <ul className='navbar-nav'>
                                            <li className='nav-item'>
                                                <h5 className="card-title">Admin list</h5>
                                            </li>
                                        </ul>
                                        <ul className='navbar-nav ms-auto'>
                                            <li className='nav-item m-1'>
                                                <Link to="/newadmin" type='button' className='btn main-color btn-outline-light'>
                                                    Add Admin
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div><div className='card-body'>
                                <AdminTable admins={admins} handleGetAdmins={this.handleGetAdmins}/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AdminList