import React from 'react';
import { Link } from 'react-router-dom';


const Signup = () => {
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="name" id="name" />
                <input type="text" placeholder="email" id="email" />
                <input type="password" placeholder="password" id="password" />
                <input type="button" value="Signup" className="btn waves-effect waves-light #64b5f6 blue darken-1" />
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;