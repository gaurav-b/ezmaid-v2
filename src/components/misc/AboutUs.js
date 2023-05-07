import React, { Component } from 'react'

class AboutUs extends Component {

    render() {
        return (
            <>
                <div className="container">
                    <div className="container col-lg-4 mt-5 d-flex flex-column align-items-center justify-content-center">
                        <div className="row justify-content-center">
                            <div className="card mb-3">

                                <div className="card-body">

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">About Us</h5>
                                        <p className="text-center large">Our platform is a web application that provides on-demand home services to help make your life easier. We connect you with professional and reliable service providers who are trained to offer top-notch services in a variety of areas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AboutUs;