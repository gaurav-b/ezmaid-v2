import CustomerRowItem from "./CustomerRowItem"

function CustomerTable(props) {

    return(
        <table className="table table-hover">
            <thead>
                <th scope='col'>#</th>
                <th scope='col'>First Name</th>
                <th scope='col'>Middle Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Contact Number</th>
                <th scope='col'>Address</th>
                <th scope='col'>Email</th>
                <th scope='col'>Adhar Card Number</th>
                <th scope='col'>PAN Card Number</th>
                <th scope='col'>Actions</th>
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
                        />
                ))
                }
            </tbody>
        </table>
    )
}

export default CustomerTable