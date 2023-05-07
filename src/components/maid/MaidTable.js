import MaidRowItem from "./MaidRowItem"

function MaidTable(props) {

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
                    props.maids.map((maid, index) => (
                        <MaidRowItem
                            key={index}
                            count={++index}
                            customerId={maid.customerId}
                            fName={maid.fName}
                            mName={maid.mName}
                            lName={maid.lName}
                            contactNumber={maid.contactNumber}
                            address={maid.address}
                            email={maid.email}
                            adharCardNumber={maid.adharCardNumber}
                            panCardNumber={maid.panCardNumber}
                        />
                ))
                }
            </tbody>
        </table>
    )
}

export default MaidTable