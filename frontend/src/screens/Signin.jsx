import React from 'react';
import { Link } from 'react-router-dom'


const Signin = () => {
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" id="email" />
                <input type="password" placeholder="password" id="password" />
                <input type="button" value="Login" className="btn waves-effect waves-light #64b5f6 blue darken-1" />
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin;