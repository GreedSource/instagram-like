import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { handleResetPassword } from '../api/auth';
import M from 'materialize-css';


const ResetPassword = () => {
    const history = useHistory();
    const [data, setData] = useState({
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
        const response = await handleResetPassword(data);
        if (!response.error){
            M.toast({html: response.message, classes: '#388e3c green darken-2'})
            history.push('/signin')
        }else{
            M.toast({html: response.error, classes: '#c62828 red darken-3'})
        }
    }
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={handlePost}>
                    <input type="text" placeholder="email" id="email" autoComplete="email" onChange={handleChange} />
                    <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1">Reset password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;