import React, { useState } from 'react';
import { ezmaidApi } from '../misc/EzmaidApi'
import { handleLogError } from '../misc/Helpers'
import { useAuth } from '../context/AuthContext'
import { Modal } from 'react-bootstrap';

function CustomerRowItem(props) {

    const { getUser } = useAuth()

    const [showModal, setShowModal] = useState(false);

    const [fName, setFName] = useState('');
    const [mName, setMName] = useState('');
    const [lName, setLName] = useState('');
    const [contactNumber, setLContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [adharCardNumber, setAdharCardNumber] = useState('');
    const [panCardNumber, setPanCardNumber] = useState('');
    const [username, setUsername] = useState('');

    const handleModalClose = () => {
        // Update state to hide modal
        setShowModal(false);
    };

    const submitVerify = (obj) => {
        alert(obj);
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
                    <button className="btn main-color text-white me-1 view-profile"
                        onClick={() => handleGetProfile(props.customerId)}>View Profile</button>
                    <button className="btn main-color text-white me-1 verify" onClick={() => submitVerify(props.customerId)}>Verify</button>
                    <button className="btn btn-danger text-white me-1">Deactivate</button>
                    {!props.isActive && <button className="btn main-color text-white">Activate</button>}
                </td>
            </tr>


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
                                        <div class="col-lg-3 col-md-4 label fw-bold">Adhar Card Number</div>
                                        <div class="col-lg-9 col-md-8">{adharCardNumber}</div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label fw-bold">PAN Card Number</div>
                                        <div class="col-lg-9 col-md-8">{panCardNumber}</div>
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
export default CustomerRowItem