import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import { Modal } from 'react-bootstrap';
import { ezmaidApi } from '../../misc/EzmaidApi'
import { handleLogError } from '../../misc/Helpers'
import StarsRating from '../../misc/StarsRating'

function MaidRequestRowItem(props) {

    const { getUser } = useAuth()

    const [showModal, setShowModal] = useState(false);
    const [showYesNoModal, setShowYesNoModal] = useState(false);
    const [confirmText, setConfirmText] = useState(false);
    const [finalWarning, setFinalWarning] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [methodName, setMethodName] = useState('');

    const [rqstId, setRqstId] = useState('');
    const [rqstTitle, setRqstTitle] = useState('');
    const [rqstDescription, setRqstDescription] = useState('');

    useEffect(() => {
        const user = getUser()
    }, [])

    const handleModalClose = () => {
        // Update state to hide modal
        setShowModal(false);
    };

    const handleYesNoModalClose = () => {
        // Update state to hide modal
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
        handleYesNoModalClose()
    }

    const handleRqstDtlModal = (maidId) => {
        setShowModal(true);
    }

    const submitAcceptRequest = (rqstDtlId) => {

        const user = getUser()

        const payload = {
            "id": rqstDtlId
        }

        ezmaidApi.maidAcceptRequest(user, payload)
            .then(response => {
                props.handleRequestsByMaidId();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const submitRejectRequest = (rqstDtlId) => {

        const user = getUser()

        const payload = {
            "id": rqstDtlId
        }

        ezmaidApi.maidRejectRequest(user, payload)
            .then(response => {
                props.handleRequestsByMaidId();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const handleCustomerRatings = (event, rqstId) => {

        const user = getUser()

        const payload = {
            "rqstId": rqstId,
            "custRating": event.target.value
        }

        ezmaidApi.addCustomerRating(user, payload)
            .then(response => {
                props.handleRequestsByMaidId();
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
                <th scope='row'>
                    <span className="form-check-inline">{props.count}</span>
                </th>
                <td>{props.rqstType}</td>
                <td>{props.rqstTitle}</td>
                <td>{props.rqstDescription}</td>
                <td>{props.customerName}</td>

                <td>
                    <button className="btn main-color text-white me-1"
                        onClick={() => handleRqstDtlModal()}>View Details</button>


                    <Modal show={showModal} onHide={handleModalClose} className='modal-lg'>
                        <Modal.Header closeButton>
                            <Modal.Title>Request Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="modal-body">
                                <section className="section profile">

                                    <div className="tab-content pt-2">

                                        <div className="tab-pane fade show active profile-overview">
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Request Type</div>
                                                <div class="col-lg-9 col-md-8">{props.rqstType}</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Customer name</div>
                                                <div class="col-lg-9 col-md-8">{props.customerName}</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Customer contact</div>
                                                <div class="col-lg-9 col-md-8">{props.request.customer.contactNumber}</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label fw-bold">Rating</div>
                                                <div className="col-lg-9 col-md-8"><StarsRating rating={props.request.customer.rating} size={32} /></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Request Title</div>
                                                <div class="col-lg-9 col-md-8">{props.rqstTitle}</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Request Description</div>
                                                <div class="col-lg-9 col-md-8">{props.rqstDescription}</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Fulfilled</div>
                                                <div class="col-lg-9 col-md-8">{props.request.isFulfilled
                                                    ?
                                                    <span class="badge border-success border-1 text-success fs-6">Yes</span>
                                                    :
                                                    <span class="badge border-danger border-1 text-danger fs-6">No</span>
                                                }
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Cancelled</div>
                                                <div class="col-lg-9 col-md-8">{props.request.isCancelled
                                                    ?
                                                    <span class="badge border-danger border-1 text-danger fs-6">Yes</span>
                                                    :
                                                    <span class="badge border-danger border-1 text-success fs-6">No</span>
                                                }</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Status</div>
                                                <div class="col-lg-9 col-md-8">
                                                    <span class="badge border-info border-1 text-info fs-6">
                                                        {props.request.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Finalized</div>
                                                <div class="col-lg-9 col-md-8">{props.request.isFinalized
                                                    ?
                                                    <span class="badge border-success border-1 text-success fs-6">Yes</span>
                                                    :
                                                    <span class="badge border-danger border-1 text-danger fs-6">No</span>
                                                }
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Did I accept?</div>
                                                <div class="col-lg-9 col-md-8">{props.requestDetail[0].isAccepted
                                                    ?
                                                    <span class="badge border-success border-1 text-success fs-6">Yes</span>
                                                    :
                                                    <span class="badge border-danger border-1 text-danger fs-6">No</span>
                                                }
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Did Customer accept?</div>
                                                <div class="col-lg-9 col-md-8">{props.requestDetail[0].isCustAccepted ?
                                                    <span class="badge border-success border-1 text-success fs-6">Yes</span>
                                                    :
                                                    <span class="badge border-danger border-1 text-danger fs-6">No</span>
                                                }
                                                </div>
                                            </div>


                                            <div class="row">
                                                {props.request.isFulfilled && props.requestDetail[0].isAccepted &&
                                                    <div class="col-lg-3 col-md-4 label fw-bold">Leave customer rating (from 0 to 5 with 0.5 steps per move)</div>}
                                                <div class="col-lg-9 col-md-8">
                                                    {props.request.isFulfilled && props.requestDetail[0].isAccepted && !props.request.custRating &&
                                                        <input type="range" className="form-range" min="0" max="5" step="0.5" id="maidRating" defaultValue="0"
                                                            onChange={(event) => handleCustomerRatings(event, props.request.rqstId)} />
                                                    }
                                                    {props.request.isFulfilled && props.requestDetail[0].isAccepted && props.request.custRating &&
                                                        <input type="range" className="form-range" min="0" max="5" step="0.5" id="maidRating" defaultValue={props.request.custRating}
                                                            onChange={(event) => handleCustomerRatings(event, props.request.rqstId)} />
                                                    }

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </section>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {!props.request.isFulfilled && !props.request.isCancelled && !props.request.isFinalized && !props.requestDetail[0].isAccepted &&
                        <button className="btn btn-success text-white me-1"
                            onClick={() => openYesNoModal(props.requestDetail[0].id, 'submitAcceptRequest', 'Are you sure to accept this request?')}>Accept</button>}
                    {props.requestDetail[0].isAccepted &&
                        <span class="badge border-success border-1 text-success fs-6">Accepted</span>}
                    {!props.request.isCancelled && !props.request.isFinalized && !props.requestDetail[0].isRejected &&
                        <button className="btn btn-danger text-white me-1"
                            onClick={() => openYesNoModal(props.requestDetail[0].id, 'submitRejectRequest', 'Are you sure to reject this request?')}>Reject</button>}
                    {props.requestDetail[0].isAccepted && props.requestDetail[0].isCustAccepted &&
                        <span class="badge border-success border-1 text-success fs-6">Customer Accepted</span>}
                    {props.requestDetail[0].isRejected &&
                        <span class="badge border-danger border-1 text-danger fs-6">Rejected</span>}
                    {props.request.isCancelled &&
                        <span class="badge border-danger border-1 text-danger fs-6">Cancelled</span>}
                    {props.request.isFinalized &&
                        <span class="badge border-success border-1 text-success fs-6">Finalized</span>}
                    {props.request.isFulfilled &&
                        <span class="badge border-success border-1 text-success fs-6">Fulfilled</span>}

                </td>
            </tr>

            <Modal show={showYesNoModal} onHide={handleYesNoModalClose} className='modal fade'>
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span class="badge border-danger border-1 text-danger fs-5">{confirmText}</span>
                    <span class="badge border-danger border-1 text-danger fs-6">{finalWarning}</span>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleYesNoModalClose()}>No</button>
                        <button type="button" className="btn main-color text-white" onClick={() => handleYesClick(selectedValue, methodName)}>Yes</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

// this statement allows us to use this component in our application 
export default MaidRequestRowItem