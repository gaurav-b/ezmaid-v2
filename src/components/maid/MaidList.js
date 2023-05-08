import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import MaidTable from './MaidTable'

class MaidList extends Component {

    static contextType = AuthContext

    state = {
        maids: [],
        isAdmin: true,
        isSuperAdmin: true,
        ismaidsLoading: false,
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

        this.handleGetMaids()
    }

    handleGetMaids = () => {
        const Auth = this.context
        const user = Auth.getUser()

        this.setState({ isMaidsLoading: true })
        ezmaidApi.maidsList(user)
            .then(response => {
                this.setState({ maids: response.data })
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
            const maids = this.state.maids;

            return (
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-11 mt-5">
                        <div className='card'>
                            <div class="card-body">
                                <h5 class="card-title">Maid List</h5>
                                <div className='card-body'>
                                    <MaidTable maids={maids} handleGetMaids={this.handleGetMaids} />
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

export default MaidList