import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import CustomerRequestRowItem from '../request/CustomerRequestRowItem'

function CustRequestTable(props) {

    const { getUser, userIsAuthenticated, userLogout } = useAuth()
    
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Request Type</th>
                    <th scope='col'>Request Title</th>
                    <th scope='col'>Request Description</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.requests.map((request, index) => (
                        <CustomerRequestRowItem
                            key={index}
                            count={++index}
                            rqstId={request.rqstId}
                            request={request}
                            rqstType={request.rqstType}
                            rqstTitle={request.rqstTitle}
                            rqstDescription={request.rqstDescription}
                            requestDetail={request.requestDetail}
                            handleGetRequests={props.handleGetRequests}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}

export default CustRequestTable