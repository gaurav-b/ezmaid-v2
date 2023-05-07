import React, { Component } from 'react'

class ContactUs extends Component {

    render() {
        return (
            <>
                <div className="container">
                    <div className="container col-lg-4 mt-5 d-flex flex-column align-items-center justify-content-center">
                        <div className="row justify-content-center">
                            <div className="card mb-3">

                                <div className="card-body">

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Email Us</h5>
                                        <p className="text-center small">info@ezmaid.com<br />contact@ezmaid.com</p>
                                    </div>

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Call Us</h5>
                                        <p className="text-center small">+91 55555555555<br />+1 6666666666</p>
                                    </div>

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Address</h5>
                                        <p className="text-center small">ABC01 Dummy Street,<br />Dummy State, DS 500232</p>
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

export default ContactUs;