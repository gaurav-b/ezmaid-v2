import React, { useState } from 'react';
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import { useAuth } from '../context/AuthContext'
import { Modal } from 'react-bootstrap';
import StarsRating from '../misc/StarsRating'

function CustomerRowItem(props) {

    const { getUser } = useAuth()

    const [showModal, setShowModal] = useState(false);
    const [showYesNoModal, setShowYesNoModal] = useState(false);
    const [confirmText, setConfirmText] = useState(false);
    const [finalWarning, setFinalWarning] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [methodName, setMethodName] = useState('');

    const [fName, setFName] = useState('');
    const [mName, setMName] = useState('');
    const [lName, setLName] = useState('');
    const [contactNumber, setLContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [adharCardNumber, setAdharCardNumber] = useState('');
    const [panCardNumber, setPanCardNumber] = useState('');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState('');

    const handleModalClose = () => {
        // Update state to hide modal
        setShowModal(false);
        setShowYesNoModal(false)
    };

    const openYesNoModal = (value, methodName, confirmText, finalWarning) => {
        // submitActivate
        setShowYesNoModal(true)
        setConfirmText(confirmText)
        setSelectedValue(value)
        setMethodName(methodName)
        setFinalWarning(finalWarning)
    }

    const handleYesClick = () => {
        if (methodName) {
            const dynamicFunction = eval(methodName);
            dynamicFunction(selectedValue);
        }
        handleModalClose()
    }

    const submitVerify = (customerId) => {

        const user = getUser()

        const payload = {
            "id": customerId
        }

        ezmaidApi.verifyCustomer(user, payload)
            .then(response => {
                props.handleGetCustomers();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const submitDeactivate = (username) => {
        const user = getUser()

        const payload = {
            "username": username
        }

        ezmaidApi.deactivateUser(user, payload)
            .then(response => {
                props.handleGetCustomers();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const submitActivate = (username) => {
        const user = getUser()

        const payload = {
            "username": username
        }

        ezmaidApi.activateUser(user, payload)
            .then(response => {
                props.handleGetCustomers();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const handleGetProfile = (customerId) => {

        const user = getUser()

        ezmaidApi.getCustomerProfile(user, customerId)
            .then(response => {
                setFName(response.data.fName)
                setMName(response.data.mName)
                setLName(response.data.lName)
                setLContactNumber(response.data.contactNumber)
                setAddress(response.data.address)
                setEmail(response.data.email)
                setAdharCardNumber(response.data.adharCardNumber)
                setPanCardNumber(response.data.panCardNumber)
                setUsername(response.data.user.username)
                setRating(response.data.rating)

                setShowModal(true);
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    return (
        <>
            <tr>
                <th scope='row'>{props.count}</th>
                <td>{props.fName}</td>
                <td>{props.mName}</td>
                <td>{props.lName}</td>
                <td>{props.contactNumber}</td>
                <td>{props.address}</td>
                <td>{props.email}</td>
                <td>{props.adharCardNumber}</td>
                <td>{props.panCardNumber}</td>
                <td style={props.adminStyle()}>
                    <button className="btn main-color text-white me-1"
                        onClick={() => handleGetProfile(props.customerId)}>View Profile</button>
                    {!props.isVerified &&
                        <button className="btn main-color text-white me-1"
                            onClick={() => openYesNoModal(props.customerId, 'submitVerify', 'Are you sure to verify this customer?', 'This will be irreversable action!')}>Verify</button>}
                    {props.isVerified &&
                        <span className="badge border-success border-1 text-success fs-6">Verified</span>}
                    {props.isActive &&
                        <button className="btn btn-danger text-white me-1"
                            onClick={() => openYesNoModal(props.username, 'submitDeactivate', 'Are you sure to deactivate this customer?')}>Deactivate</button>}
                    {!props.isActive &&
                        <button className="btn main-color text-white"
                            onClick={() => openYesNoModal(props.username, 'submitActivate', 'Are you sure to activate this customer?')}>Activate</button>}
                </td>
            </tr>

            <Modal show={showYesNoModal} onHide={handleModalClose} className='modal fade'>
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <span class="badge border-danger border-1 text-danger fs-5">{confirmText}</span>
                    <span class="badge border-danger border-1 text-danger fs-6">{finalWarning}</span>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleModalClose()}>No</button>
                        <button type="button" className="btn main-color text-white" onClick={() => handleYesClick(selectedValue, methodName)}>Yes</button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showModal} onHide={handleModalClose} className='modal-lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="modal-body">
                        <section className="section profile">

                            <div className="tab-content pt-2">

                                <div className="tab-pane fade show active profile-overview">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">Full Name</div>
                                        <div className="col-lg-9 col-md-8">{fName + ' ' + mName + ' ' + lName}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">Contact Number</div>
                                        <div className="col-lg-9 col-md-8">{contactNumber}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">Address</div>
                                        <div className="col-lg-9 col-md-8">{address}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">Email</div>
                                        <div className="col-lg-9 col-md-8">{email}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">Adhar Card Number</div>
                                        <div className="col-lg-9 col-md-8">{adharCardNumber}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">PAN Card Number</div>
                                        <div className="col-lg-9 col-md-8">{panCardNumber}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">Username</div>
                                        <div className="col-lg-9 col-md-8">{username}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label fw-bold">Rating</div>
                                        <div className="col-lg-9 col-md-8"><StarsRating rating={rating} size={32} /></div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )

}

// this statement allows us to use this component in our application 
export default CustomerRowItem