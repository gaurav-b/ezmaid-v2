import React, { useState } from 'react';
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import { useAuth } from '../context/AuthContext'
import { Modal } from 'react-bootstrap';

function AdminRowItem(props) {

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
    const [username, setUsername] = useState('');

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

    const submitDeactivate = (username) => {
        const user = getUser()

        const payload = {
            "username": username
        }

        ezmaidApi.deactivateUser(user, payload)
            .then(response => {
                props.handleGetAdmins();
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
                props.handleGetAdmins();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const handleGetProfile = (adminId) => {

        const user = getUser()

        ezmaidApi.getAdminProfile(user, adminId)
            .then(response => {
                setFName(response.data.fName)
                setMName(response.data.mName)
                setLName(response.data.lName)
                setLContactNumber(response.data.contactNumber)
                setAddress(response.data.address)
                setEmail(response.data.email)
                setUsername(response.data.user.username)

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
                <td>{props.username}</td>
                <td>{props.fName}</td>
                <td>{props.mName}</td>
                <td>{props.lName}</td>
                <td>{props.contactNumber}</td>
                <td>{props.address}</td>
                <td>{props.email}</td>
                <td>
                    <button className="btn main-color text-white me-1 view-profile"
                        onClick={() => handleGetProfile(props.adminId)}>View Profile</button>
                    {props.isActive &&
                        <button className="btn btn-danger text-white me-1"
                            onClick={() => openYesNoModal(props.username, 'submitDeactivate', 'Are you sure to deactivate this admin?')}>Deactivate</button>}
                    {!props.isActive &&
                        <button className="btn main-color text-white"
                            onClick={() => openYesNoModal(props.username, 'submitActivate', 'Are you sure to activate this admin?')}>Activate</button>}
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

                    <div class="modal-body">
                        <section class="section profile">

                            <div class="tab-content pt-2">

                                <div class="tab-pane fade show active profile-overview">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label fw-bold">Full Name</div>
                                        <div class="col-lg-9 col-md-8">{fName + ' ' + mName + ' ' + lName}</div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label fw-bold">Contact Number</div>
                                        <div class="col-lg-9 col-md-8">{contactNumber}</div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label fw-bold">Address</div>
                                        <div class="col-lg-9 col-md-8">{address}</div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label fw-bold">Email</div>
                                        <div class="col-lg-9 col-md-8">{email}</div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label fw-bold">Username</div>
                                        <div class="col-lg-9 col-md-8">{username}</div>
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
export default AdminRowItem