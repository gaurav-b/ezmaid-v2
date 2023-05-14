import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import { Modal } from 'react-bootstrap';
import { ezmaidApi } from '../../misc/EzmaidApi'
import { handleLogError } from '../../misc/Helpers'

function CustomerRequestRowItem(props) {

    const { getUser } = useAuth()

    const [showModal, setShowModal] = useState(false);

    const [maidIds, setMaidIds] = useState([])
    const [maidRatings, setMaidRatings] = useState([])
    const [showFinalize, setShowFinalize] = useState(false)

    const [maidRatingMap, setMaidRatingMap] = useState(new Map());

    useEffect(() => {
        const user = getUser()
        const currMaidsSelected = [...maidIds];
        if (currMaidsSelected.length > 0) {
            setShowFinalize(true)
        } else {
            setShowFinalize(false)
        }
    }, [maidIds])

    const handleModalClose = () => {
        // Update state to hide modal
        setShowModal(false);
        setMaidIds([]);
        setMaidRatings([]);
        maidRatingMap.clear()
    };

    const handleRqstDtlModal = (maidId) => {
        props.handleGetRequests();
        setShowModal(true);
    }

    const handleRatingsChange = (event, maidId) => {

        const currMaidsSelected = [...maidIds];
        const currRatingselected = [...maidRatings];

        if (maidRatingMap.has(maidId)) {
            maidRatingMap.set(maidId, event.target.value);
        } else {
            maidRatingMap.set(maidId, event.target.value);
        }
    }

    const submitCancelRequest = (rqstId) => {

        const user = getUser()

        const payload = {
            "rqstId": rqstId
        }

        ezmaidApi.cancelRequest(user, payload)
            .then(response => {
                props.handleGetRequests();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const submitFinalizeRequest = (rqstId) => {

        const user = getUser()
        const currMaidsSelected = [...maidIds];

        const payload = {
            "rqstId": rqstId,
            "maidIds": currMaidsSelected
        }

        ezmaidApi.finalizeRequest(user, payload)
            .then(response => {
                props.handleGetRequests();
                setShowModal(false);
                setMaidIds([]);
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const submitFulfillRequest = (rqstId) => {

        const user = getUser()
        const currMaidsSelected = [...maidIds];
        const currRatingselected = [...maidRatings];

        maidRatingMap.forEach((value, key) => {
            currMaidsSelected.push(key);
            currRatingselected.push(value);
        });

        const payload = {
            "rqstId": rqstId,
            "maidIds": currMaidsSelected,
            "maidRatings": currRatingselected
        }

        ezmaidApi.fulfillRequest(user, payload)
            .then(response => {
                props.handleGetRequests();
                setShowModal(false);
                setMaidIds([]);
                setMaidRatings([]);
                maidRatingMap.clear();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const submitUpdateRatings = (rqstId) => {

        const user = getUser()
        const currMaidsSelected = [...maidIds];
        const currRatingselected = [...maidRatings];

        maidRatingMap.forEach((value, key) => {
            currMaidsSelected.push(key);
            currRatingselected.push(value);
        });

        const payload = {
            "rqstId": rqstId,
            "maidIds": currMaidsSelected,
            "maidRatings": currRatingselected
        }

        ezmaidApi.updateRatings(user, payload)
            .then(response => {
                props.handleGetRequests();
                setShowModal(false);
                setMaidIds([]);
                setMaidRatings([]);
                maidRatingMap.clear();
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
            })
    }

    const handleRadioChange = (event, maidId) => {

        const currMaidsSelected = [...maidIds];

        currMaidsSelected.splice(0, 1);
        currMaidsSelected.push(maidId);

        setMaidIds(currMaidsSelected)
    }

    const handleCheckboxChange = (event, maidId) => {

        const currMaidsSelected = [...maidIds];

        if (event.target.checked) {
            currMaidsSelected.push(maidId);
        } else {
            const index = currMaidsSelected.findIndex((selectedMaid) => selectedMaid === maidId);
            currMaidsSelected.splice(index, 1);
        }

        setMaidIds(currMaidsSelected)
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

                <td>
                    {
                        (!props.request.isCancelled && !props.request.isFinalized)
                            ?
                            <button className="btn main-color text-white me-1"
                                onClick={() => handleRqstDtlModal()}>Cehck Details & Finalize</button>
                            :
                            <button className="btn main-color text-white me-1"
                                onClick={() => handleRqstDtlModal()}>Cehck Details & Fulfill</button>
                    }
                    {!props.request.isCancelled && !props.request.isFinalized &&
                        <button className="btn btn-danger text-white me-1" onClick={() => submitCancelRequest(props.rqstId)}>Cancel</button>}
                    {props.request.isCancelled &&
                        <span class="badge border-danger border-1 text-danger fs-6">Cancelled</span>}
                    {props.request.isFinalized && !props.request.isFulfilled &&
                        <span class="badge border-success border-1 text-success fs-6">Finalized</span>}
                    {props.request.isFulfilled &&
                        <span class="badge border-success border-1 text-success fs-6">Fulfilled</span>}
                </td>
            </tr>

            <Modal show={showModal} onHide={handleModalClose} className='modal-xl'>

                <div className='card'>
                    <div class="card-header">
                        <nav className='navbar navbar-expand-lg navbar-dark py-3'>
                            <div className='navbar-collapse' id='navbarNavDropdown'>
                                <ul className='navbar-nav'>
                                    <li className='nav-item'>
                                        <h5 className="card-title">Request Details</h5>
                                    </li>
                                </ul>
                                <ul className='navbar-nav ms-auto'>
                                    <li className='nav-item m-1'>
                                        {showFinalize && <a href="#" type='button' className='btn main-color btn-outline-light'
                                            onClick={() => submitFinalizeRequest(props.request.rqstId)}>
                                            Finalize Request
                                        </a>}
                                        {props.request.isFinalized && !props.request.isFulfilled &&
                                            <a href="#" type='button' className='btn main-color btn-outline-light'
                                                onClick={() => submitFulfillRequest(props.request.rqstId)}>
                                                Fullfill Request
                                            </a>}

                                        {props.request.isFulfilled &&
                                            <a href="#" type='button' className='btn main-color btn-outline-light'
                                                onClick={() => submitUpdateRatings(props.request.rqstId)}>
                                                Update ratings
                                            </a>}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div>
                        <div className='card-body'>
                            <div className="modal-body">
                                <section className="section profile">

                                    <div className="tab-content pt-2">

                                        <div className="tab-pane fade show active profile-overview">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>#</th>
                                                        <th scope='col'>Maid Name</th>
                                                        <th scope='col'>Maid Contact</th>
                                                        {props.request.isFulfilled &&
                                                            <th scope='col'>Rating by you</th>
                                                        }
                                                        <th scope='col'>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.requestDetail.map((detail, index) => (
                                                            <>
                                                                <tr>
                                                                    <th scope='row'>
                                                                        {(!props.request.isCancelled && !props.request.isFinalized && !props.request.isFulfilled) &&
                                                                            props.rqstType === 'Event' && detail.isAccepted &&
                                                                            <div className="form-check form-switch form-check-inline me-0">
                                                                                <input className="form-check-input" type="checkbox"
                                                                                    checked={maidIds.some((maidIds) => maidIds === detail.maid.maidId)}
                                                                                    onChange={(event) => handleCheckboxChange(event, detail.maid.maidId)}
                                                                                /></div>
                                                                        }
                                                                        {(!props.request.isCancelled && !props.request.isFinalized && !props.request.isFulfilled) &&
                                                                            props.rqstType === 'MonthlyBasis' && detail.isAccepted &&
                                                                            <div className="form-check form-switch form-check-inline me-0">
                                                                                <input className="form-check-input" type="radio" name="maidRadio" id={"radio" + index}
                                                                                    checked={maidIds.some((maidIds) => maidIds === detail.maid.maidId)}
                                                                                    onChange={(event) => handleRadioChange(event, detail.maid.maidId)}
                                                                                /></div>
                                                                        }
                                                                        <span className="form-check-inline">{++index}</span>
                                                                    </th>
                                                                    <td>{detail.maid.fName + ' ' + detail.maid.mName + ' ' + detail.maid.lName}</td>
                                                                    <td>{detail.maid.contactNumber}</td>
                                                                    {props.request.isFulfilled &&
                                                                        <th scope='col'>{detail.maidRating}</th>
                                                                    }

                                                                    <td>
                                                                        {detail.isAccepted && <span class="badge border-success border-1 text-success fs-6">Maid Accepted</span>}
                                                                        {detail.isRejected && <span class="badge border-danger border-1 text-danger fs-6">Maid Rejected</span>}
                                                                        {detail.isCustAccepted && <span class="badge border-success border-1 text-success fs-6">Customer Accepted</span>}
                                                                        {detail.isCustRejected && <span class="badge border-danger border-1 text-danger fs-6">Customer Rejected</span>}

                                                                        {!detail.isAccepted && !detail.isRejected &&
                                                                            <span class="badge border-info border-1 text-info fs-6">Pending at maid</span>}
                                                                        <div>
                                                                            {(props.request.isFinalized && !detail.isRejected && !detail.isCustRejected) &&
                                                                                <>
                                                                                    <label for="customRange2" className="form-label">
                                                                                        <span class="badge border-info border-1 text-info fs-6">Leave maid rating below (from 0 to 5 with 0.5 steps per move)</span>
                                                                                    </label>
                                                                                    {!detail.maidRating &&
                                                                                        <input type="range" className="form-range" min="0" max="5" step="0.5" id="maidRating" defaultValue="0"
                                                                                            onChange={(event) => handleRatingsChange(event, detail.maid.maidId)}/>
                                                                                    }
                                                                                    {detail.maidRating &&
                                                                                        <input type="range" className="form-range" min="0" max="5" step="0.5" id="maidRating" defaultValue={detail.maidRating}
                                                                                            onChange={(event) => handleRatingsChange(event, detail.maid.maidId)}/>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="tab-pane fade show active profile-overview">
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Request Type</div>
                                                <div class="col-lg-9 col-md-8">{props.rqstType}</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label fw-bold">Customer contact</div>
                                                <div class="col-lg-9 col-md-8">{props.request.customer.contactNumber}</div>
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
                                                }
                                                </div>
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
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal></>
    )
}

// this statement allows us to use this component in our application 
export default CustomerRequestRowItem