import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'

export const Heros = () => {

    const { getUser, userIsAuthenticated, userLogout } = useAuth()

    const enterMenuStyle = () => {
        return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
    }

    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>How we help</h1>
                            <p className="lead">
                                Our platform offers a solution to the common problem of finding trusted service providers for household tasks.
                                With just a few clicks, our users can easily book a service from a pool of trained and experienced professionals,
                                without having to spend time searching for and vetting individual providers.
                            </p>
                            <div className="col-12 col-md-12 container d-flex justify-content-left align-items-left">
                                <Link className="btn main-color btn-lg text-white" to='/signup' style={enterMenuStyle()}>
                                    Sign up
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>Simple and easy!</h1>
                            <p className="lead">
                                Our on-demand home service platform is designed to be simple and easy to use.
                                With our user-friendly interface, you can easily browse and book the services you need,
                                without any hassle. Our platform's intuitive design ensures that you can navigate
                                through the booking process quickly and easily.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className="d-lg-none">

                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2">
                            <h1>We help people</h1>
                            <p className="lead">
                                Our platform offers a solution to the common problem of finding trusted service providers for household tasks.
                                With just a few clicks, our users can easily book a service from a pool of trained and experienced professionals,
                                without having to spend time searching for and vetting individual providers.
                            </p>
                            <a className="btn main-color btn-lg text-white" href='#'>Sign up</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="col-image-right"></div>
                        <div className="mt-2">
                            <h1>Simple and easy!</h1>
                            <p className="lead">
                                Our on-demand home service platform is designed to be simple and easy to use.
                                With our user-friendly interface, you can easily browse and book the services you need,
                                without any hassle. Our platform's intuitive design ensures that you can navigate
                                through the booking process quickly and easily.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}