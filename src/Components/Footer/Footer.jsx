
import React from 'react';

function Footer() {
    return (
        <footer className="bg-main-light py-2">
            <div className="container">
                <h2>Get the Fresh Cart App</h2>
                <p>We will send you a link. Open it on your phone to download the app.</p>
                <form className="d-flex">
                    <div className="col-sm-10">
                        <label htmlFor="email" className="visually-hidden">Email</label>
                        <input type="email" id="email" className="form-control py-2" placeholder="Enter your email" />
                    </div>
                    <div className="col-sm-2 ps-3">
                        <button type="submit" className="btn w-100 bg-main text-white">Get App Link</button>
                    </div>
                </form>
                <div className="line border-bottom border-2 my-4"></div>
            </div>
        </footer>
    );
}

export default Footer;