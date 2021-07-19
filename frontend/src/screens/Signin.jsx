import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import  { UserContext }  from '../routes/Routes';
import { handleSignin } from '../api/auth';
import M from 'materialize-css';


const Signin = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [data, setData] = useState({
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
        const status = await handleSignin(data);
        if (!status.error){
            localStorage.setItem('jwt', status.token);
            localStorage.setItem('user', JSON.stringify(status.user));
            dispatch({type: 'USER', payload: status.user});
            M.toast({html: 'Successfully signed in', classes: '#388e3c green darken-2'})
            history.push('/')
        }else{
            M.toast({html: status.error, classes: '#c62828 red darken-3'})
        }
    }
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={handlePost}>
                    <input type="text" placeholder="email" id="email" autoComplete="email" onChange={handleChange} />
                    <input type="password" placeholder="password" id="password" autoComplete="current-password" onChange={handleChange} />
                    <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1" >Login</button>
                </form>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
                <h6>
                    <Link to="/reset-password">Forgot your password?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signin;