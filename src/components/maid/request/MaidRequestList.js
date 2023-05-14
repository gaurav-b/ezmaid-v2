import { Component } from 'react'
import AuthContext from '../../context/AuthContext'
import { ezmaidApi } from '../../misc/EzmaidApi'
import { handleLogError } from '../../misc/Helpers'
import MaidRequestTable from '../request/MaidRequestTable'

class MaidRequestList extends Component {

    static contextType = AuthContext

    state = {
        requests: [],
        isMaid: true,
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

        const isMaid = user.data.rol[0] === 'Maid'
        const isAdmin = user.data.rol[0] === 'Admin'
        const isSuperAdmin = user.data.rol[0] === 'SuperAdmin'

        this.setState({ isAdmin })
        this.setState({ isSuperAdmin })
        this.setState({ isMaid })

        this.handleRequestsByMaidId()
    }

    handleRequestsByMaidId = () => {
        const Auth = this.context
        const user = Auth.getUser()

        ezmaidApi.requestListMaid(user)
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

        const {isMaid, requests, showModal, isError, errorMessageDetails, showError } = this.state

        if (isMaid) {
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
                                        <MaidRequestTable requests={requests} handleRequestsByMaidId={this.handleRequestsByMaidId} />
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

export default MaidRequestList    