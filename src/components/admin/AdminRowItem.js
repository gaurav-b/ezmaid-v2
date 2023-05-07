function AdminRowItem(props) {

    return (
        <tr>
            <th scope='row'>{props.count}</th>        
            <td>{props.username}</td>
            <td>{props.fName}</td>
            <td>{props.mName}</td>
            <td>{props.lName}</td>
            <td>{props.contactNumber}</td>
            <td>{props.address}</td>
            <td>{props.email}</td>
        </tr>
    )

}

// this statement allows us to use this component in our application 
export default AdminRowItem