import CustomerRowItem from "./CustomerRowItem"
import { useAuth } from '../context/AuthContext'

function CustomerTable(props) {

    const { getUser} = useAuth()

    const adminStyle = () => {
        const user = getUser()
        return user && user.data.rol[0] === 'Admin' ? { "display": "block" } : { "display": "none" }
    }

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Middle Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Contact Number</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Adhar Card Number</th>
                    <th scope='col'>PAN Card Number</th>
                    <th scope='col' style={adminStyle()}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.customers.map((customer, index) => (
                        <CustomerRowItem
                            key={index}
                            count={++index}
                            customerId={customer.customerId}
                            fName={customer.fName}
                            mName={customer.mName}
                            lName={customer.lName}
                            contactNumber={customer.contactNumber}
                            address={customer.address}
                            email={customer.email}
                            adharCardNumber={customer.adharCardNumber}
                            panCardNumber={customer.panCardNumber}
                            isActive={customer.user.isActive}
                            username={customer.user.username}
                            adminStyle={adminStyle}
                            handleGetCustomers={props.handleGetCustomers}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}

export default CustomerTable