import MaidRowItem from "./MaidRowItem"
import { useAuth } from '../context/AuthContext'

function MaidTable(props) {

    const { getUser, userIsAuthenticated, userLogout } = useAuth()

    const adminStyle = () => {
        const user = getUser()
        return user && user.data.rol[0] === 'Admin' ? { "display": "block" } : { "display": "none" }
    }

    const customerStyle = () => {
        const user = getUser()
        return user && user.data.rol[0] === 'Customer' ? { "display": "block" } : { "display": "none" }
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
                    <th scope='col' style={customerStyle()}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.maids.map((maid, index) => (
                        <MaidRowItem
                            key={index}
                            count={++index}
                            maidId={maid.maidId}
                            fName={maid.fName}
                            mName={maid.mName}
                            lName={maid.lName}
                            contactNumber={maid.contactNumber}
                            address={maid.address}
                            email={maid.email}
                            adharCardNumber={maid.adharCardNumber}
                            panCardNumber={maid.panCardNumber}
                            isActive={maid.user.isActive}
                            isVerified={maid.isVerified}
                            username={maid.user.username}
                            adminStyle={adminStyle}
                            customerStyle={customerStyle}
                            handleGetMaids={props.handleGetMaids}
                            handleCheckboxChange={props.handleCheckboxChange}
                            maidIds={props.maidIds}
                            maidRating={maid.maidRating}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}

export default MaidTable