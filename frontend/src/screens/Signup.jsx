import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { handleSignup } from '../api/auth';
import M from 'materialize-css';


const Signup = () => {
    const history = useHistory();
    const [data, setData] = useState({
        name: '',
        password: '',
        email: '',
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        });
    }
    const handlePost = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)){
            M.toast({html: 'Invalid email!', classes: '#c62828 red darken-3'})
            return
        }
        const status = await handleSignup(data);
        if (!status.error){
            M.toast({html: status.message, classes: '#388e3c green darken-2'});
            history.push('/signin')
        }else{
            M.toast({html: status.error, classes: '#c62828 red darken-3'})
        }
    }
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={handlePost}>
                    <input type="text" placeholder="name" id="name" onChange={handleChange} />
                    <input type="text" placeholder="email" id="email" autoComplete="email" onChange={handleChange}  />
                    <input type="password" placeholder="password" autoComplete="current-password" id="password" onChange={handleChange}  />
                    <input type="submit" value="Signup" className="btn waves-effect waves-light #64b5f6 blue darken-1" />
                </form>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;