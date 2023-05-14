import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import MaidRequestRowItem from '../request/MaidRequestRowItem'

function MaidRequestTable(props) {

    const { getUser, userIsAuthenticated, userLogout } = useAuth()
    
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Request Type</th>
                    <th scope='col'>Request Title</th>
                    <th scope='col'>Request Description</th>
                    <th scope='col'>Customer Name</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.requests.map((request, index) => (
                        <MaidRequestRowItem
                            key={index}
                            count={++index}
                            rqstId={request.rqstId}
                            request={request}
                            rqstType={request.rqstType}
                            rqstTitle={request.rqstTitle}
                            rqstDescription={request.rqstDescription}
                            customerName={request.customer.fName + ' ' + request.customer.mName + ' ' + request.customer.lName }
                            requestDetail={request.requestDetail}
                            handleRequestsByMaidId={props.handleRequestsByMaidId}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}

export default MaidRequestTable