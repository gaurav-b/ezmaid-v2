import { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import MaidTable from './MaidTable'
import { Form, Message } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap';

class MaidList extends Component {

    static contextType = AuthContext

    state = {
        maids: [],
        maidIds: [],
        isCustomer: true,
        isAdmin: true,
        isSuperAdmin: true,
        showModal: false,
        isError: false,
        errorMessage: '',
        errorMessageDetails: '',
        showError: false,

        rqstType: 'MonthlyBasis',
        rqstTitle: '',
        rqstDesc: ''
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

        this.handleGetMaids()
    }

    handleModalClose = () => {
        // Update state to hide modal
        this.setState({ showModal: false })
        this.setState({ isError: false, showError: false })
    };

    hideErrorMessage = (e) => {
        this.setState({ isError: false, showError: false })
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleCheckboxChange = (event, maidId) => {
        const currMaidsSelected = [...this.state.maidIds];

        if (event.target.checked) {
            currMaidsSelected.push(maidId);
        } else {
            const index = currMaidsSelected.findIndex((selectedMaid) => selectedMaid === maidId);
            currMaidsSelected.splice(index, 1);
        }

        this.setState({ maidIds: currMaidsSelected })
    }

    resetCheckboxes = (event, maidId) => {
        const currMaidsSelected = [...this.state.maidIds];

        if (event.target.checked) {
            currMaidsSelected.push(maidId);
        } else {
            const index = currMaidsSelected.findIndex((selectedMaid) => selectedMaid === maidId);
            currMaidsSelected.splice(index, 1);
        }

        this.setState({ maidIds: currMaidsSelected })
    }

    handleGetMaids = () => {
        const Auth = this.context
        const user = Auth.getUser()

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

    handleNewRequestForm = () => {

        const { maidIds } = this.state

        if (maidIds.length === 0) {
            this.setState({
                isError: true,
                errorMessage: 'You should select at least one maid to raise your request!',
                showError: true
            })
            this.setState({ showModal: true })
            return
        }

        this.setState({ showModal: true })
    }

    handleNewRequestSubmit = (e) => {
        e.preventDefault()

        const { maidIds, rqstType, rqstTitle, rqstDesc } = this.state

        if (!(maidIds.length != 0 && rqstType && rqstTitle && rqstDesc)) {
            if ((rqstType && rqstTitle && rqstDesc)) {
                if (maidIds.length === 0) {
                    this.setState({
                        isError: true,
                        errorMessage: 'You should select at least one maid to raise your request!',
                        showError: true
                    })
                    this.setState({ showModal: true })
                }
            } else {
                this.setState({
                    isError: true,
                    errorMessage: 'Please, inform all fields!',
                    showError: true
                })
            }
            
            return
        }

        const Auth = this.context
        const user = Auth.getUser()

        const toBeSaved = { maidIds, rqstType, rqstTitle, rqstDesc }

        ezmaidApi.addNewRqst(toBeSaved, user)
            .then(response => {

                this.setState({
                    maidIds: [],
                    showModal: false,
                    isError: false,
                    errorMessage: '',
                    errorMessageDetails: '',
                    showError: false,

                    rqstType: 'MonthlyBasis',
                    rqstTitle: '',
                    rqstDesc: ''
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
                    } else {
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

        const { isSuperAdmin, isAdmin, isCustomer, maidIds, showModal, isError, errorMessageDetails, showError } = this.state

        if (isSuperAdmin || isAdmin || isCustomer) {
            const { maids, errorMessage, toAdminList } = this.state

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
                                                    <h5 className="card-title">Maid List</h5>
                                                </li>
                                            </ul>
                                            {isCustomer &&
                                                <ul className='navbar-nav ms-auto'>
                                                    <li className='nav-item m-1'>
                                                        <Link to='' type='button'
                                                            className='btn main-color btn-outline-light'
                                                            onClick={() => this.handleNewRequestForm()}>
                                                            Raise Request
                                                        </Link>
                                                    </li>
                                                </ul>
                                            }
                                        </div>
                                    </nav>
                                </div>
                                <div>
                                    <div className='card-body'>
                                        <MaidTable maids={maids} maidIds={maidIds} handleGetMaids={this.handleGetMaids}
                                            handleCheckboxChange={this.handleCheckboxChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal show={showModal} onHide={this.handleModalClose} className='modal-lg'>
                        <Modal.Header closeButton>
                            <Modal.Title>New Request</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="row justify-content-center align-items-center">
                                <div className="col-lg-11 mt-5">

                                    <form className="row g-3">

                                        <div className="col-md-4">
                                            <Form.Input
                                                fluid
                                                name='maidIds'
                                                iconPosition='left'
                                                value={maidIds}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <Form.Radio
                                                    fluid
                                                    name='rqstType'
                                                    id='monthlyBasis'
                                                    value='MonthlyBasis'
                                                    checked='true'
                                                    onChange={this.handleInputChange}
                                                    label="Monthly Basis"
                                                />
                                            </div>
                                            <div className="form-check">
                                                <Form.Radio
                                                    fluid
                                                    name='rqstType'
                                                    id='event'
                                                    value='Event'
                                                    onChange={this.handleInputChange}
                                                    label="Event"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Input
                                                fluid
                                                name='rqstTitle'
                                                iconPosition='left'
                                                placeholder='Request Title'
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <Form.TextArea
                                                rows={3}
                                                name='rqstDesc'
                                                placeholder='Request Description'
                                                onChange={this.handleInputChange}
                                                style={{ "width": "100%", 'resize': 'none', 'border-color': '#deddd9' }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn main-color text-white me-1" onClick={this.handleNewRequestSubmit}>Submit</button>
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </form>
                                    {isError && showError && <Message negative onClick={this.hideErrorMessage}>{errorMessage}</Message>}
                                    {errorMessageDetails && showError && <Message negative onClick={this.hideErrorMessage}>{errorMessageDetails}</Message>}
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            )
        } else {
            return <Navigate to='/' />
        }
    }
}

export default MaidList