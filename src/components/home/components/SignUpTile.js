import { NavLink } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'

export const SignUpTile = () => {

    const { getUser, userIsAuthenticated, userLogout } = useAuth()

    const enterMenuStyle = () => {
        return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
    }

    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-4 fw-bold">
                        Explore the possibilities with our proffessional solution!
                    </h1>
                    <p className="lead">
                        If you cannot find what you are looking for,
                        send our library admin's a personal message!
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                        <NavLink className="btn main-color btn-lg text-white" to='/signup' style={enterMenuStyle()}>
                            Sign up
                        </NavLink>
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    );
}